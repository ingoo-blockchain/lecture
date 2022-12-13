# 패키지 매니저



## 1.1 npm 기본

- Node 의 패키지 매니저
- 다른 개발자들이 소스 코드를 모아둔 폴더모음
- 다른 개발자들이 만들어놓은 코드로 이어서 작업가능
- 이미 나이가 많이 먹은 프로그램을 다시 구현할 필요가없음 ex ) 파일업로드 등등...



```sh
$ npm init
$ npm install [패키지명]
$ npm run [내용]
$ npm install -D [패키지명] # -D는 dependencies ex ) npm install nodemon
$ npm install -g rimraf # -g 는 global 설치입니다. 해당프로젝트 뿐만아니라. 내컴퓨터 한해서, 모든 nodejs 프로젝트에서는 
#						  rimraf 라는 패키지가 실행될수있도록 해주는 기능입니다. 참고로 이녀석은 package.json에 표시되지않습니다.
#						  마치 내장모듈처럼 사용하게됩니다.
$ npx rimraf 

# package name : package의 이름을 정하는 공간
# version : 패키지 버전을 만드는 공간 ( 우리가 임의로 버전을 생성함 )
#           대부분 SemVer 방식을 따름 ( Mejor.Minor.Patch ) 1.0.15 이런형식 
# entry point : 자바스크립트 실행 파일의 진입점 우리가 여지껏 만들었던 파일이라면 server.js가 되겠네요.
# test command : 코드 테스트 할떄 입력할 명령어 이것은 향후 배울예정,
# git repository : 이제는 무엇인지 알겠죠? git 저장소 주소를 적어놔서 우리가 나중에 코드를 배포하면 연락처 라고 보시면되겠습니다
# keywords : npm 공식 홈페이지에 남길 키워드입니다. 
# license : 해당 패키지의 라이센스를 넣는데 저는 주로 오픈소스로 하다보니 MIT 로 하시면됩니다 그외는 잘모름..
# scripts :  npm 명령어중 우리가 써봤던 내용은 npm init 입니다 
#			 이뜻은 npm init을 실행한 디렉토리에 package.json을 생성해주는 명령어인데
#			 npm 명령어는 init외 더 존재합니다.
#            npm run 이라는 명령어인데 이것은 package.json 파일안에 scripts 객체 안에있는 내용을 실행시켜주는 아이입니다.
#			 예를들어 npm run test를 하게되면, package.json 파일안에 있는 test 속성의 값을 실행시켜줍니다.
#			 "echo \"Error: no test specified\" && exit 1" 지금은 단순히 출력만해주네요,
#			 이번에는 간단한 명령어를 만들어봅시다 우리가 자주사용하는 node server 를 만들어서 사용해봅시다,
# dependencies : 우리는 npm 명령어중 npm init과 npm run 을 사용해봤는데, 
#				 사실 하나더 사용한것이 있습니다 바로 npm install 이죠 
#				 dependencies 는 우리가 외부 패키지를 다운받은 목록을 보여주고 그 값으로는 버전이 들어갑니다.
#				 이렇게 버전이 나오는이유는 나중에 설치한 패키지(라이브러리) 들을 다지우고 설치를 할때 똑같은 내용으로 설치하기 위해서 
#                메모를 했다고 생각하시는게 편하실거에요,
# devDependencies : 이건 npm install -D 할떄 생겨나는것으로, 나중에 배포버전 내보낼떄는 nodemon을 사용하지 않기떄문에,
#					즉 테스트 / 개발을 진행할떄만 사용하는 라이브러리를 구분하기위해서 생겨난것입니다.
```



**package.json**

```
{
  "name": "node_2",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "node server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.0.0",
    "express": "^4.17.3",
    "mysql2": "^2.3.3",
    "nunjucks": "^3.2.3"
  },
  "devDependencies": {
    "nodemon": "^2.0.15"
  }
}

```

**server.js**

```sh
console.log('hello start')
```



> npm install [패키지명] 으로 설치를 진행할경우 node_modules 에 내용이 파일들이 만들어지는데.
>
> 나중에 배포를 진행 할 경우 이파일은 용량이 너무커서 삭제해서 올리는경우가 많습니다. ex ) github...
>
> 그러면 패키지들은 꼭필요한대 어떻게 다시 다운받거나 github에 올라간 파일을 실행하나요?
>
> 그것은 npm install 이라는 명령어를 사용하게되면 기본적으로 package.json 안에있는 dependencies 에 있는 내용을 전부다 다운을 받습니다.



**rimraf**

> 이녀석의 기능은 그냥 파일삭제입니다. 리눅스의 rm 같은 기능인데, nodejs 에서 삭제할수있게 해주는 아이죠,
>
> global 설치 떄문에 해본겁니다. 그래서 이아이 는 글로벌 설치이기떄문에 만약에 배포시 이녀석이 꼭 필요한 상황인데.
>
> package.json에 내용이 입력이 안되어있어서, 다른 제3자가 내파일을 실행할려고하면 실행이안될겁니다.



**npx**

npx 는 global설치를한 내용을 설치없이 바로 실행할려고할떄 사용하는 명령어입니다.

```sh
npx rimraf node_moduels # 이것은 npm install -g rimraf 없이 사용이 가능합니다
#						  그래서 대부분 npm install -d rimraf 개발모드로 설치후 npx로 실행도 자주합니다.


```





## 1.2 npm 추가 명령어



```sh
$ npm uninstall [패키지명] # 패키지를 삭제할때 사용합니다. package.json 에도 영향이 끼칩니다.
$ npm version [버전 [Semver 형식으로 작성..]] # package.json 버전을 올림
$ npm login # npm 로그인을 하기 위한 명령어 (npmjs.com에서 회원가입)
$ npm whoami # 현재 사용자가 누구인지 알려줌
$ npm logout # 로그인 한 계정을 로그아웃
$ npm publish # 만든 코드 배포하기~
$ npm unpublish # 만든 패키지 배포 중단 ( 단 72 시간정도? 안에만 가능)
```



> 이후 npmjs.com 에서 회원가입을 진행해주세요.



## 1.3 npm publish (배포하기)



```sh
$ npm login

# name 을 설정하라고 합니다.
# email을 입력하라고 합니다.
# 이후 이메일에 적힌 유효인증코드를 입력하라고 합니다.

# 성공메시지 뜨면

$ npm whoami # name 값이 뜨는지 확인. 
```



여기까지 성공되었다면

내가 올릴 패키지명을 적어보도록 하겠습니다.



**package.json**

```json
{
	name:'express'
	...
}
/*
	이미 express 라는 패키지가 있는건 우리는 알지만 한번 똑같은이름으로 올라가는지 봅시다.
*/
```



이미 올라가있는 express 올린사람의 계정과 현 로그인한 계정이달라서 올라가지 않는모습..





**package.json**

```json
{
	"name":"ingoo_001"
}

/*
	이번엔 없을것같은 이름으로 지정한뒤 올려봅시다.
*/
```



**server.js**

```js
module.exports = () => {
    return 'hello package';
}
```



```sh
$ npm publish
```



올라간 모습



**server.js**

```js
module.exports = () => {
    return 'hello package!';
}

/*
	return 안에값에 ! 하나를 더붙혀서 다시 수정해봅시다.
*/
```



> 버전이슈로 배포가 진행안됨.
>
> 이유는 똑같은 버전으로올려서는 안됩니다.
>
> npm version fetch 로 짜잘한 수정버전을 해봅시다 .현 1.0.1 인데. fetch를 올렸으니 1.0.2 가 될것입니다.





```sh
$ npm publish
```



성공 한번

https://www.npmjs.com/ 에 들어가서 확인해봅시다.





```sh
$ npm info ingoo_0001	
```



그럼이제 쓸모없으니 당장지웁시다.





```sh
$ npm unpublish [패키지명] -f
```



