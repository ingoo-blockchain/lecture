# Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Action": ["s3:GetObject", "s3:PutObject"],
            "Resource": ["arn:aws:s3:::<버킷 이름>/*"]
        }
    ]
}
```

-   `version` : 정책 버전에 대해서 지정 2012-10-17은 IAM 정책의 현재 버전입니다.
-   `Statement` : 정책에 대한 규칙을 지정하는 속성입니다.
    -   `Effect` : 규칙에 대한 효과 설정 `Allow` or `Deny` 로 지정 가능하며, 허용할지 허용하지 않을지를 결정 할때 사용
    -   `Principal` : 규칙을 적용할 AWS 서비스 or IAM 사용자/그룹 을 지정합니다.
    -   `Action` : 규칙에서 수행 할 수 있는 작업을 지정합니다.
    -   `Resource` : 규칙이 적용되는 AWS 리소스를 지정합니다.

위에 정책을 해석하자면.

이정책의 버전은 `2012-10-17` 이라는 뜻입니다.
이후 정책은 하나를 등록할 것이며 `(Statement) 가 하나라는 뜻..`

해당 정책에는 허용할 `정책(기능)` 을 정합니다 - Effect
그리고 이 정책이 적용은 `lambda.amazonaws.com` 즉 람다가 될것이고,

람다가 어떤 기능을 수행할것이냐면

-   s3:GetObject
-   s3:PutObject

S3 에 파일을 가져오고, 파일을 넣는 행위를 수행하도록 한다는 뜻입니다.
이후 람다가 어떤 `s3` 에 대한 내용을 사용할지 지정합니다


## CLI 로 정책 만들기 

Lambda_Policy.json 
```sh
aws iam create-role --role-name my-lambda-role --assume-role-policy-document file://trust-policy.json

aws iam create-role --role-name develrocket-front-lambda --assume-role-policy-document file://Lambda_Policy.json
```