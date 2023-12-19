import style from './../styles/css/NavBar.module.css';
import Icone from './../images/newJob.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile, CgMenuCheese, CgClose } from "react-icons/cg";
import { useEffect, useRef } from 'react';

function NavBar(){
    const menuRef = useRef(null);
    const dispatch = useDispatch();
    const { activatedItem, isLoged, windowWidth, menuOpen } = useSelector(rootReducer => rootReducer.useReducer);

    const itens = [
        {key: 1, value: 'Home', link: '/'},
        {key: 2, value: 'Ver vagas', link: '/vagas'},
        {key: 3, value: 'Sou empresa', link: 'empresa'},
        {key: 4, value: 'Sobre o projeto', link: 'sobreprojeto'},
    ];

    useEffect(() => {
        const updateWindowSize = () => {
            dispatch({
                type: 'ChangeWindowWidth',
                payload: window.innerWidth,
            });
        };

        if (typeof window !== 'undefined') {
            dispatch({
                type: 'ChangeWindowWidth',
                payload: window.innerWidth,
            })
            window.addEventListener('resize', updateWindowSize);
        }

        return () => {
            window.removeEventListener('resize', updateWindowSize);
        };
    }, [dispatch]);

    const openMenu = (event) => {
        event.stopPropagation();
        dispatch({
            type: 'ChangeMenuOpen',
        })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(menuOpen && menuRef.current && !menuRef.current.contains(event.target)){
                dispatch({
                    type: 'ChangeMenuOpen',
                })
            }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen, dispatch]);

    const changeActivatedItem = (value) => {
        dispatch({
            type: 'ChangeMenuOpen',
        })
        dispatch({
            type: 'ChangeActivatedItem',
            payload: value,
        });
    }

    return(
        <nav className={style.navbar}>
            <div className={style.textIcon}>
                <img src={Icone} alt="Ícone" width={43} height={43} />
                <span className={style.re}>Re</span>
                <span className={style.job}>Job</span>
            </div>

            {windowWidth <= 1100 ?
                <div className={style.containerMenu}>
                    <button className={menuOpen ? style.menuOpen : style.menuClose} onClick={(event) => openMenu(event)}>
                        {menuOpen?
                            <CgClose />
                            :
                            <CgMenuCheese />}
                    </button>
                    {menuOpen?
                        <div className={style.menu} ref={menuRef}>
                            <ul>
                                {itens.map((item) => (
                                    <a key={item.key} href={item.link} onClick={() => changeActivatedItem(item.link)}>
                                        <li className={item.link === activatedItem ? style.ativado : null}>{item.value}</li>
                                    </a>
                                ))}
                            </ul>
                        </div>
                        :
                        null}
                </div>
                :
                <ul>
                    {itens.map((item) => (
                        <a key={item.key} href={item.link} onClick={() => changeActivatedItem(item.link)}>
                            <li className={item.link === activatedItem ? style.ativado : null}>{item.value}</li>
                        </a>
                    ))}
                </ul>}
                {isLoged ?
                    <div className={style.profile}>
                        <CgProfile />
                    </div>
                    :
                    <a href='login' className={style.loginLink}>
                        <button>Login</button>
                    </a>}
        </nav>
    );
}

export default NavBar;