import { LoginModal } from "./LoginModal";

export const Login = ({ onClick }) => {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { store, actions } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
  };
  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsFlipped(!isFlipped);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    actions
      .logIn(email, password)
      .then(async () => {
        toast.success("Inicio de sesión correcto");
        actions.getPrivateData();
        // navigate("/private");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    handleClose();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error("Tus contraseñas no coinciden");
    } else {
      try {
        await actions.signUp(username, email, password, passwordConfirmation);
        toast.success("Tu usuario ha sido creado correctamente");
        setIsFlipped(false); // Cambia a la vista de inicio de sesión después de un registro exitoso
      } catch (error) {
        toast.error("Hubo un error al crear tu usuario");
      }
    }
  };

  return (
    <Container
      className="login d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <LoginModal
        show={show}
        handleClose={handleClose}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        username={username}
        setUsername={setUsername}
        passwordConfirmation={passwordConfirmation}
        setPasswordConfirmation={setPasswordConfirmation}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </Container>
  );
};
