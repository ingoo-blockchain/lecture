import { useCallback } from 'react'
import { HeaderWrapper, Logo, Nav } from './header.styled'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    const category = [
        { path: '/', name: 'Home' },
        {
            path: '/board',
            name: '게시판',
            subMenu: [
                { path: '/board/list', name: '리스트' },
                { path: '/board/write', name: '글쓰기' },
            ],
        },
        { path: '/login', name: '로그인' },
        { path: '/singup', name: '회원가입' },
        { path: '/logout', name: '로그아웃', isLogin: true },
        { path: '/profile', name: '프로필', isLogin: true },
    ]

    const navigation = useCallback((category) => {
        const login = true // 상태 대체로
        const callback = (item) => (
            <li key={item.path}>
                <NavLink to={item.path}>{item.name}</NavLink>
                {item.subMenu && navigation(item.subMenu)}
            </li>
        )
        const menu = category.filter((v) => v.isLogin !== login)
        return <ul>{menu.map(callback)}</ul>
    }, [])

    return (
        <HeaderWrapper>
            <Logo>Logo</Logo>
            <Nav>{navigation(category)}</Nav>
        </HeaderWrapper>
    )
}
