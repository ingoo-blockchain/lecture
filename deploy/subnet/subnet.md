# subnet 

- `MapPublicIpOnLaunch` 속성 

새로 생성된 인스턴스에 자동으로 public ip 를 할당하려면 MapPublicIpOnLaunch 속성을 `true` 로 설정해야하며,
안할 경우에는 `false` 로 설정하면 됩니다

cli 로 내용을 변경하실려면 아래와 같은 명령어를 실행해야함.

```sh

aws ec2 modify-subnet-attribute --subnet-id <subnet-id> --map-public-ip-on-launch
```