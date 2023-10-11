# 테이블 스키마

```mermaid
erDiagram

User {
	email varchar PK "고유 아이디"
	nickname varchar
	passwd varchar
	provider ENUM "default:local"
	snsId varchar
}

Board {
	id int PK "#Auto_increment"
}
```
