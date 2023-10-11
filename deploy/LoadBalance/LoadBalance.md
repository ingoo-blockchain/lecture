# Load Balance CLI 로 시작하기

## 목차

-   1. Application Load Balancer 생성
-   2. Target Group 생성
-   3. Lambda Group 생성
-   4. Listener 생성

## 1. Application Load Balancer 생성

aws elbv2 create-load balancer

-   `--name` : Load Balancer 이름
-   `--type` : application \*\*
-   `--subnets` : Load Balancer 가 위치할 서브넷
-   `--security-groups` : Load Balaner의 보안그룹

**--type**

--type 옵션은 Load Balancer 에서 Application Load Balancer (ALB) 와 Network Load Balancer (NLB) 를 지원합니다
따라서 --type 부분은 application 또는 network 두가지 타입 가능합니다.

**--subnets**

서브넷은 퍼블릭 서브넷이여야 합니다, 퍼블릭 서브넷은 인터넷 게이트웨이가 연결 되어있어야 하며, 로드 밸런서와
인터넷 게이트웨이가 모두 퍼블릭 서브넷에 배치되어야 합니다.

```sh
aws ec2 describe-subnets --filters "Name=vpc-id,Values=<vpc-id>"
aws ec2 describe-vpcs --query 'Vpcs[*].[Tags[?Key==`Name`].Value, VpcId]' --output json # vpc-09f1e3c703b9cea74

aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-09f1e3c703b9cea74" # subnet-0f7c4263234af967c subnet-0362d972f19f80767
aws ec2 describe-subnets --filters "Name=vpc-id,Values=vpc-09f1e3c703b9cea74" --query 'Subnets[?MapPublicIpOnLaunch==`true`].[SubnetId]' --output text
# subnet-0f7c4263234af967c subnet-0362d972f19f80767

aws ec2 describe-security-groups --filters "Name=vpc-id,Values=vpc-09f1e3c703b9cea74"
```

```sh
aws elbv2 create-load-balancer --name develrocket-front-lb --type application --subnets subnet-0f7c4263234af967c subnet-0362d972f19f80767 --security-groups sg-0bb7be1e9ed758956

# arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:loadbalancer/app/develrocket-front-lb/a98e5ff05cc033ae
```

## 2. Target Group 생성

-   `--name` : Target Group 이름
-   `--protocol` : 대상의 프로토콜 (`http`, `https`, `tcp`, `tls`)
-   `--port` : 대상의 포트
-   `--vpc-id` : Target Group 이 위치한 VPC ID
-   `--target-type` : instance or lambda

```sh
# instance...
aws elbv2 create-target-group --name front-lb-tg --protocol HTTP --port 80 --vpc-id vpc-09f1e3c703b9cea74
# arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:targetgroup/front-lb-tg/3713ed3a35f0302e


# lambda
aws elbv2 create-target-group --name front-lb-tg --target-type lambda
```

--target-type 이 lambda 일 경우 아래 내용 추가

```sh
aws lambda add-permission \
  --function-name develrocket-front-lambda \
  --statement-id develrocket-front-load-balancer \
  --principal elasticloadbalancing.amazonaws.com \
  --action lambda:InvokeFunction \
  --source-arn arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:targetgroup/front-lb-tg/3713ed3a35f0302e

# 지우고 싶은경우

aws lambda remove-permission \
  --function-name develrocket-front-lambda \
  --statement-id develrocket-front-load-balancer
```

--function-name: 권한을 부여할 Lambda 함수의 이름입니다.
--statement-id: 권한을 구분하는 고유한 식별자입니다.
--principal: 권한을 부여하는 주체입니다. 이 경우에는 Amazon Elastic Load Balancing입니다.
--action: 허용할 Lambda 함수 작업을 지정합니다. 이 경우에는 함수를 호출할 수 있는 lambda:InvokeFunction 작업이 허용됩니다.
--source-arn: 권한 부여를 요청한 Elastic Load Balancer의 Amazon 리소스 이름(ARN)입니다.

--source-arn 구하는 cli

```sh
aws elbv2 describe-target-groups --region ap-northeast-2 --query 'TargetGroups[*].TargetGroupArn' --output text
```

## 3. Lambda 함수 추가

-   `--target-group-arn` : 대상 그룹의 ARN
-   `--targets` : 등록할 대상의 정보 (`Id`는 인스턴스 ID, `Port`는 대상의 포트)

```sh
# lambda arn 만들기
# aws lambda get-function --function-name develrocket-front-lambda --query 'Configuration.FunctionArn' --output text
# arn:aws:lambda:{region}:{account_id}:function:{function_name}

arn:aws:lambda:{region}:{account_id}:function:{function_name}
arn:aws:lambda:ap-northeast-2:363239913720:function:develrocket-front-lambda

aws elbv2 register-targets --target-group-arn arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:targetgroup/front-lb-tg/3713ed3a35f0302e --targets LambdaFunctionArn=arn:aws:lambda:ap-northeast-2:363239913720:function:develrocket-front-lambda,Port=80

aws elbv2 describe-target-groups --names front-lb-tg

aws elbv2 register-targets --target-group-arn arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:targetgroup/front-lb-tg/8f962e2623917534 --targets Id=arn:aws:lambda:ap-northeast-2:363239913720:function:develrocket-front-lambda

```

## 4. Listner 생성

```sh
aws elbv2 create-listener \
    --load-balancer-arn <load-balancer-arn> \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=<target-group-arn>
```

-   `--load-balancer-arn` : Load Balancer의 ARN
-   `--protocol` : Listener 프로토콜 (`http`, `https`, `tcp`, `tls`)
-   `--port` : Listener 포트
-   `--default-actions` : Listner 에 대한 기본 작업 (`Type` 은 작업 유형, `TargetGroupArn` 은 대상 그룹 ARM)

```sh
aws elbv2 create-listener \
    --load-balancer-arn arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:loadbalancer/app/develrocket-front-lb/a98e5ff05cc033ae \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:ap-northeast-2:363239913720:targetgroup/front-lb-tg/8f962e2623917534
```

aws elbv2 describe-load-balancers --query 'LoadBalancers[*].LoadBalancerArn' --output text

aws elbv2 register-targets --target-group-arn [target-group-arn-1] --targets Id=[lambda-id-1],Port=80

load-balancer
