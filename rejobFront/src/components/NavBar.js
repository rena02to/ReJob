import style from "./../styles/css/NavBar.module.css";
import Icone from "./../images/newJob.png";
import { useDispatch, useSelector } from "react-redux";
import { CgMenuCheese, CgClose } from "react-icons/cg";
import { useEffect, useRef } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const rotaAtual = window.location.pathname;
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
    nameUser,
  } = useSelector((rootReducer) => rootReducer.useReducer);

  const itens = [
    { key: 1, value: "Home", link: "/" },
    { key: 2, value: "Ver vagas", link: "/vagas" },
    { key: 3, value: "Sou empresa", link: "/beneficios-empresa" },
    { key: 4, value: "Sobre o projeto", link: "/sobre-projeto" },
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

    dispatch({
      type: "ChangeActivatedItem",
      payload: rotaAtual,
    });

    const loadLoged = async () => {
      try{
        const data = await api.get("users/me");
        console.log(data)
        dispatch({
          type: "ChangeLoged",
          payload: true,
        })
        dispatch({
          type: "setTypeUser",
          payload: data.data.user.role,
        })
        dispatch({
          type: "setNameUser",
          payload: data.data.user.name,
        })
      }catch(error){
        dispatch({
          type: "ChangeLoged",
          payload: false,
        })
        console.log("Erro ao carregar os dados do login: ", error);
      }
    }

    loadLoged();

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen, profileOpen, dispatch, rotaAtual]);

  const changeActivatedItem = () => {
    dispatch({
      type: "ChangeMenuOpen",
    });
  };

  const Out = () => {
    sessionStorage.removeItem('token');
    navigate("/");
    dispatch({
      type: "ChangeLoged",
      payload: false,
    })
  }

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
                  <a key={item.key} href={item.link}>
                    <li
                      className={
                        item.link === activatedItem ? style.ativado : null
                      }
                      onClick={changeActivatedItem}
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
            <a key={item.key} href={item.link}>
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
          <button className={style.dash} title={`Dashboard de ${nameUser}`} onClick={(event) =>openMenu(event, "ChangeProfileOpen", !profileOpen)}>
            Dashboard
          </button>
          {profileOpen ? (
            <div className={style.profileMenu} ref={profileRef}>
              <p>{nameUser}</p>
              <a href={typeUser === "COMPANY" ? "/painel-empresa" : typeUser === "COLLABORATOR" ? "/painel-colaborador" : typeUser === "USER" ? "/painel-egresso" : "##"}>
                <button className={style.go}>
                  Ir para o dashboard
                </button>
              </a>
              <button className={style.out} onClick={Out}>
                Sair
              </button>
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
              <a href="/login">
                <button className={style.login}>Entrar</button>
              </a>
              <a href="/cadastro">
                <button className={style.register}>Cadastrar-se</button>
              </a>
            </div>
          ) : null}
        </>
      )}
    </nav>
  );
}

export default NavBar;
