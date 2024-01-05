import style from "./../styles/css/NavBar.module.css";
import Icone from "./../images/newJob.png";
import { useDispatch, useSelector } from "react-redux";
import { CgMenuCheese, CgClose } from "react-icons/cg";
import {
  FaCircleUser,
  FaUserTie,
  FaClipboardUser,
  FaUsersViewfinder,
} from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { useEffect, useRef } from "react";

function NavBar() {
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const {
    activatedItem,
    isLoged,
    windowWidth,
    menuOpen,
    profileOpen,
    typeUser,
    nomeUser,
  } = useSelector((rootReducer) => rootReducer.useReducer);

  const itens = [
    { key: 1, value: "Home", link: "/" },
    { key: 2, value: "Ver vagas", link: "/Vacancies" },
    { key: 3, value: "Sou empresa", link: "/beneficiosempresa" },
    { key: 4, value: "Sobre o projeto", link: "/sobreprojeto" },
  ];

  useEffect(() => {
    const updateWindowSize = () => {
      dispatch({
        type: "ChangeWindowWidth",
        payload: window.innerWidth,
      });
    };

    if (typeof window !== "undefined") {
      dispatch({
        type: "ChangeWindowWidth",
        payload: window.innerWidth,
      });
      window.addEventListener("resize", updateWindowSize);
    }

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, [dispatch]);

  const openMenu = (event, type, value) => {
    event.stopPropagation();
    dispatch({
      type: type,
      payload: value,
    });

    if (type === "ChangeMenuOpen" && profileOpen) {
      dispatch({
        type: "ChangeProfileOpen",
        payload: false,
      });
    } else if (type === "ChangeProfileOpen" && menuOpen) {
      dispatch({
        type: "ChangeMenuOpen",
        payload: false,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (menuOpen &&
          menuRef.current &&
          !menuRef.current.contains(event.target)) ||
        (profileOpen &&
          profileRef.current &&
          !profileRef.current.contains(event.target))
      ) {
        dispatch({
          type: "ChangeMenuOpen",
          payload: false,
        });

        dispatch({
          type: "ChangeProfileOpen",
          payload: false,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen, profileOpen, dispatch]);

  const changeActivatedItem = (value) => {
    dispatch({
      type: "ChangeMenuOpen",
    });
    dispatch({
      type: "ChangeActivatedItem",
      payload: value,
    });
  };

  return (
    <nav className={style.navbar}>
      <div className={style.textIcon}>
        <img src={Icone} alt="Ícone" width={43} height={43} />
        <span className={style.re}>Re</span>
        <span className={style.job}>Job</span>
      </div>

      {windowWidth <= 1100 ? (
        <div className={style.containerMenu}>
          <button
            className={menuOpen ? style.menuOpen : style.menuClose}
            onClick={(event) => openMenu(event, "ChangeMenuOpen", !menuOpen)}
          >
            {menuOpen ? <CgClose /> : <CgMenuCheese />}
          </button>
          {menuOpen ? (
            <div className={style.menu} ref={menuRef}>
              <ul>
                {itens.map((item) => (
                  <a
                    key={item.key}
                    href={item.link}
                    onClick={() => changeActivatedItem(item.link)}
                  >
                    <li
                      className={
                        item.link === activatedItem ? style.ativado : null
                      }
                    >
                      {item.value}
                    </li>
                  </a>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <ul>
          {itens.map((item) => (
            <a
              key={item.key}
              href={item.link}
              onClick={() => changeActivatedItem(item.link)}
            >
              <li
                className={item.link === activatedItem ? style.ativado : null}
              >
                {item.value}
              </li>
            </a>
          ))}
        </ul>
      )}
      {isLoged ? (
        <>
          <button
            className={
              profileOpen ? style.profileIconOpen : style.profileIconClose
            }
            onClick={(event) =>
              openMenu(event, "ChangeProfileOpen", !profileOpen)
            }
          >
            <FaCircleUser />
          </button>
          {profileOpen ? (
            <div className={style.profileMenu} ref={profileRef}>
              <p>Olá, seja bem vindo(a) {nomeUser}!</p>
              {typeUser === "candidato" ? (
                <div className={style.links}>
                  <div className={style.interno}>
                    <FaUserEdit />
                    <a href="##">Meu perfil</a>
                  </div>
                  <div className={style.interno}>
                    <MdWorkHistory />
                    <a href="##">Vagas que me candidatei</a>
                  </div>
                </div>
              ) : typeUser === "empresa" ? (
                <div className={style.links}>
                  <div className={style.interno}>
                    <FaUserTie />
                    <a href="##">Minha empresa</a>
                  </div>
                  <div className={style.interno}>
                    <MdWorkHistory />
                    <a href="##">Minhas vagas</a>
                  </div>
                </div>
              ) : (
                <div className={style.links}>
                  <div className={style.interno}>
                    <FaClipboardUser />
                    <a href="##">Meu perfil</a>
                  </div>
                  <div className={style.interno}>
                    <FaUsersViewfinder />
                    <a href="##">Candidatos que supervisiono</a>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <button
            className={style.entreCadastre}
            onClick={(event) =>
              openMenu(event, "ChangeProfileOpen", !profileOpen)
            }
          >
            Comece agora
          </button>
          {profileOpen ? (
            <div className={style.profileMenu} ref={profileRef}>
              <p>Entre ou cadastre-se</p>
              <a>
                <button>Entrar</button>
              </a>
              <a>
                <button>Cadastrar-se</button>
              </a>
            </div>
          ) : null}
        </>
      )}
    </nav>
  );
}

export default NavBar;
