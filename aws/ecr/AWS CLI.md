# AWS CLI 에서 Amazon ECR 사용하기





## AWS CLI 설치 



**확인 작업**

```sh
$ aws --version
```



설치가 안되어있다면, 각 OS에 맞게 설치를 진행해야함.



1. Dockerfile 에서 Docker 이미지 빌드

```
docker build -t develrocket_back .
```



2. Docker images를 실행하여 이미지가 올바르게 생성되었는지 확인합니다

```
docker images --filter reference=develrocket_back
```





## 기본 레지스트리에 대해 인증

AWS CLI를 설치 및 구성했으면, 기본 레지스트리에 대해 Docker CLI 를 인증합니다. 이렇게 하면 docker 명령이 Amazon ECR을 사용하여 이미지를 푸시하고 가져올 수 있습니다.

AWS CLI는 인증 절차를 간소화 하는 get-login-password 명령어를 제공합니다.



이 `get-login-password` 는 AWS CLI 를 사용시 Amazon ECR 프라이빗 레지스트리에 인증하는 데 선호되는 방법입니다. AWS 와 상호작용하기 위해 AWS CLI를 구성 했는지는 확인합니다. 



```
region : ap-northeast-2
aws_account_id arn:aws:iam::363239913720:user/web7722

aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 363239913720.dkr.ecr.region.amazonaws.com
```

