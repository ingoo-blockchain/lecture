# Lambda

AWS Lambda는 Amazon Web Services (AWS)의 서버리스 컴퓨팅 서비스 중 하나로, 개발자가 서버 프로비저닝, 관리, 스케일링 등과 같은 인프라 관련 작업을 걱정하지 않고 코드 실행에 집중할 수 있도록 지원합니다.

AWS Lambda는 함수를 실행하는 데 필요한 모든 것을 관리합니다. 개발자는 코드를 작성하고 AWS Lambda가 이를 실행하는 데 필요한 컴퓨팅 리소스를 프로비저닝하거나 구성할 필요가 없습니다. Lambda 함수는 이벤트에 응답하여 실행되며, 필요한 경우 다른 AWS 서비스와 통합할 수 있습니다. 예를 들어, AWS S3 버킷에 파일이 업로드되면 Lambda 함수를 실행하여 해당 파일을 처리하도록 구성할 수 있습니다.

AWS Lambda는 사용한 만큼만 지불하도록 요금 체계가 구성되어 있으며, 코드가 실행되는 데 걸리는 시간(밀리초)에 따라 청구됩니다. 이를 통해 개발자는 필요한 만큼의 리소스를 사용하고 그에 따라 비용을 지불할 수 있습니다.

## 핵심키워드

-   **서버리스**

Serverless 아키텍처는 서버리스 컴퓨팅 아키텍처로, 개발자가 서버를 직접 프로비저닝하거나 관리하지 않고도 애플리케이션을 실행할 수 있도록 하는 컴퓨팅 모델입니다. 즉, 서버의 운영체제나 인프라스트럭처를 개발자가 직접 구성하거나 관리할 필요가 없으며, 인프라스트럭처 관리를 대신 처리하는 클라우드 서비스 제공 업체에게 위임합니다.

서버리스 컴퓨팅은 AWS Lambda, Azure Functions, Google Cloud Functions와 같은 Function-as-a-Service (FaaS) 서비스를 기반으로 하고 있습니다. 이러한 서비스는 개발자가 코드를 업로드하고 함수를 실행하는 데 필요한 인프라스트럭처를 프로비저닝하거나 구성할 필요 없이, 함수 실행을 관리합니다. 이를 통해 개발자는 코드 작성에만 집중할 수 있으며, 시스템의 유지 관리나 인프라 관련 작업을 하지 않아도 됩니다.

서버리스 아키텍처의 장점으로는 확장성이 높고, 인프라 관리 비용이 적게 든다는 것이 있습니다. 함수의 실행 수가 증가할 때 서비스 제공 업체가 자동으로 스케일링을 처리하므로, 서버를 프로비저닝하고 구성할 필요가 없습니다. 이로 인해 비용이 절감되며, 더 빠르고 유연한 애플리케이션 개발이 가능해집니다.

-   **프로비저닝**

프로비저닝(Provisioning)은 컴퓨팅 자원을 할당하고 구성하는 프로세스를 말합니다. 이는 일반적으로 서버, 스토리지, 네트워크 등의 인프라 자원을 구성하는 것을 의미합니다.

서버 프로비저닝의 경우, 예를 들어 새로운 서버를 구매하거나 가상화 기술을 사용하여 가상 서버를 생성하고 구성하는 것을 의미합니다. 이는 보안 구성, 운영 체제 설치, 라이브러리와 응용 프로그램 구성, 네트워크 구성, 백업 구성 등의 작업을 수행할 수 있습니다.

프로비저닝은 기존의 방식으로 수동으로 수행되거나, 자동화된 툴을 사용하여 자동으로 수행될 수 있습니다. 자동화된 프로비저닝은 빠르고 일관된 방식으로 자원을 할당하고 구성할 수 있으며, 인프라스트럭처를 프로그래밍 방식으로 관리할 수 있는 장점이 있습니다.

AWS Lambda의 경우, 프로비저닝이 필요 없으며, 사용자는 자신의 코드를 업로드하고 함수가 실행되는 방식을 구성하기만 하면 됩니다. 이는 사용자가 코드 작성에 집중할 수 있도록 하며, 시스템의 유지 관리 및 스케일링 작업을 AWS가 대신 처리하기 때문에 효율적이고 편리합니다.

-   **스케일링**

스케일링(Scaling)은 서비스의 부하가 증가할 때 시스템의 처리 능력을 유지하거나 높이기 위해 리소스를 추가 또는 감소시키는 과정입니다. 이를 통해 사용자 요청에 대한 대응력을 높이고 시스템의 가용성과 성능을 유지할 수 있습니다.

수동으로 스케일링을 수행하는 방법과 자동화된 스케일링을 수행하는 방법이 있습니다. 수동 스케일링은 인프라스트럭처나 서비스를 직접 조작하여 수행할 수 있습니다. 예를 들어, 웹 서버에 대한 요청이 많아지면 서버의 수를 증가시키는 것입니다. 반면에 자동화된 스케일링은 시스템의 부하를 모니터링하고 설정된 조건을 충족시키면 자동으로 리소스를 추가하거나 제거합니다. 이를 통해 더욱 빠르고 정확하게 스케일링을 수행할 수 있습니다.

## 작업 진행 순서

-   1. 배포를 진행할 간단한 서버 구현
-   2. 서버리스 아키텍처를 사용함에 따라, serverless-http 사용
-   3. AWS CLI 로 Lambda 만들기

### 1. 배포를 진행할 간단한 서버

**server.js**

```javascript
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/test', (req, res) => {
    res.send('test')
})

app.listen(port, () => {
    console.log(`server is running on port : ${port}`)
})
```

## 2. serverless-http 사용

```sh
npm install serverless-http
```

기존 `server.js` 파일 수정

```javascript
const serverless = require('serverless-http')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/test', (req, res) => {
    res.send('test')
})

// express 에서 직접 실행 X
// app.listen(port, () => {
//     console.log(`server is running on port : ${port}`)
// })

module.exports.handler = serverless(app)
```

## 3. AWS CLI 로 Lambda 만들기

**목차**

-   3.1 AWS CLI 설치 여부
-   3.2 policy.json 파일 생성 (AWS 정책)
-   3.3 ROLE 생성
-   3.4 Application 압축 (Server.js 파일 압축)
-   3.5 Lambda 함수 생성 및 배포
-   3.6 Lambda 함수 호출 및 결과 로그 확인

### 3.1 AWS CLI 설치 여부 확인

```sh
aws --version  # Version 이 나오면 설치가 잘되었다는 뜻
aws configure list # IAM 설정도 끝났다는 뜻!
```

AWS Lambda 를 생성 할 때는
`AWS Lambda` 라는 명령어가 존재합니다.

## 3.2 AWS VPC 확인하기

```sh
aws ec2 describe-vpcs

aws ec2 describe-vpcs --query 'Vpcs[*].Tags[?Key==`Name`].Value[]' --output text
aws ec2 describe-vpcs --query 'Vpcs[*].[Tags[?Key==`Name`].Value, VpcId]' --output json
# 해당 VPC 이하 $vpc_id 라고 표현함
```

## 3.2 보안 그룹 생성하기

```sh
aws ec2 create-security-group --group-name <GROUP_NAME> --description "<GROUP_DESCRIPTION>" --vpc-id <VPC_ID>

aws ec2 create-security-group --group-name develrocket-front-sg --description "develrocket front security group" --vpc-id vpc-09f1e3c703b9cea74

# 이후 생성되는 security-group id 메모
# {
#    "GroupId": "sg-045fbd18e9c95cd9a"
# }

aws ec2 authorize-security-group-ingress --group-id sg-045fbd18e9c95cd9a --ip-permissions IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges='[{CidrIp=0.0.0.0/0}]' IpProtocol=tcp,FromPort=443,ToPort=443,IpRanges='[{CidrIp=0.0.0.0/0}]'

## 이름 지정

aws ec2 create-tags --resources sg-045fbd18e9c95cd9a --tags Key=Name,Value=develrocket_front_security_group
```

## 3.3 IAM arn 값 구하기

```sh
aws iam list-users --query "Users[].Arn"
```

## 3.3 Lambda 만들기

`aws lambda create-function`

-   --function-name: 생성할 Lambda 함수의 이름을 지정합니다.
-   --runtime: Lambda 함수에서 사용할 런타임을 지정합니다. 예를 들어, nodejs14.x나 python3.8과 같은 값을 사용할 수 있습니다.
-   --role: Lambda 함수에서 사용할 IAM 역할의 ARN을 지정합니다. 이 역할은 함수가 사용하는 AWS 리소스에 대한 액세스 권한을 제공합니다.
-   --handler: Lambda 함수에서 실행할 핸들러의 이름을 지정합니다. 이 핸들러는 "파일명.함수이름" 형식으로 작성됩니다. 예를 들어, index.handler와 같이 작성할 수 있습니다.
-   --code: Lambda 함수의 코드가 포함된 ZIP 파일의 위치를 지정합니다. S3 버킷에 업로드된 ZIP 파일을 참조하려면, "S3Bucket=버킷이름,S3Key=파일이름.zip"과 같은 형식으로 입력합니다.
-   --description: Lambda 함수에 대한 설명을 추가합니다.
-   --timeout: Lambda 함수의 실행 시간 제한을 초 단위로 지정합니다. 이 시간이 초과되면 함수가 중지됩니다.
-   --memory-size: Lambda 함수에서 사용할 메모리 크기를 MB 단위로 지정합니다. 높은 메모리 크기는 더 높은 CPU 할당량을 제공합니다.
-   --publish: Lambda 함수를 배포 가능한 버전으로 만듭니다.
-   --tags: Lambda 함수에 연결할 태그를 지정합니다.
-   --vpc-config: Lambda 함수를 실행할 때 사용할 VPC 구성을 지정합니다. 이 구성은 Lambda 함수가 사용할 서브넷 및 보안 그룹을 포함합니다.
-   --environment: Lambda 함수에서 사용할 환경 변수를 지정합니다. 이 변수는 Lambda 함수에서 참조할 수 있습니다.
    옵션 외에도, --zip-file 옵션을 사용하여 ZIP 파일이 포함된 로컬 경로를 직접 지정할 수도 있습니다. --zip-file 옵션을 사용하는 경우, --code 옵션은 무시됩니다.

여기서 필요한 부분은

`--function-name`, `--runtime` , `--region`, `--handle`, `--code`, `--role`

```
aws lambda create-function --function-name develrocket-front-lambda --runtime nodejs16.x --handler server.handler --code S3Bucket=develrocket-bucket-front,S3Key=develrocket/front.zip --role arn:aws:iam::363239913720:role/develrocket-front-lambda
```


실행시켜보기

