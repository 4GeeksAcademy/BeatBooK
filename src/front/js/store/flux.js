const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: null,
      message: null,
      events: [],
      allUsers: [],
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      signUp: async (username, email, password, passwordConfirmation) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/sign_up", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
            }),
          });
          const data = await resp.json();
          console.log(data);

          // Actualiza el estado global con la información del usuario
          setStore({ user: data });

          return data;
        } catch (error) {
          console.log("Error signing up", error);
        }
      },
      logIn: async (email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/log_in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          if (!resp.ok) {
            throw new Error("Correo o contraseña no coinciden");
          }

          const data = await resp.json();
          // console.log(data);

          // Actualiza el estado global con la información del usuario
          setStore({ user: data });
          // Guarda el token en la localStorage
          // También deberías almacenar el usuario en la store utilizando la función setItem
          localStorage.setItem("jwt-token", data.token);

          return data;
        } catch (error) {
          console.log("Error logging in", error);
          throw error; // Asegúrate de volver a lanzar el error para que pueda ser capturado en tu componente
        }
        const user = setStore({ user }); // Obtén la información del usuario aquí...
      },
      logOut: () => {
        // Borra el objeto user del estado global
        setStore({ user: null });

        // Borra el token del almacenamiento local
        localStorage.removeItem("jwt-token");

        // Muestra un mensaje de éxito
        // toast.success("Has cerrado sesión correctamente");
      },
      getPrivateData: async () => {
        try {
          const token = localStorage.getItem("jwt-token");
          const resp = await fetch(process.env.BACKEND_URL + "/api/private", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (resp.status === 401) {
            // El token no es válido o ha expirado
            localStorage.removeItem("jwt-token");
            setStore({ user: null });
            throw new Error("Token inválido o expirado");
          }

          if (!resp.ok) {
            throw new Error("Error al obtener datos privados");
          }

          const data = await resp.json();

          // Actualiza el estado global con la información obtenida
          setStore({ user: data });

          return data;
        } catch (error) {
          console.log("Error al obtener datos privados", error);
          throw error;
        }
      },
      createEvent: async (eventData) => {
        try {
          const response = await fetch(
            process.env.BACKEND_URL + "/api/events",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(eventData),
            }
          );

          if (!response.ok) {
            throw new Error("Error creating event");
          }

          const data = await response.json();
          // Aquí puedes actualizar tu store con la nueva información del evento si es necesario
          return data;
        } catch (error) {
          console.log("Error creating event", error);
        }
      },
      getEvents: async (searchTerm) => {
        const store = getStore();
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/events");
          const data = await resp.json();
          setStore({ events: data });
          return data;
        } catch (error) {
          console.log("Error loading events from backend", error);
        }
      },
      getEvent: async (id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + `/api/events/${id}`
          );
          const data = await resp.json();
          setStore({ event: data });
          return data;
        } catch (error) {
          console.log("Error loading event from backend", error);
        }
      },
      getAllUsers: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/users");
          const data = await resp.json();

          // Actualiza el estado global con la información obtenida
          setStore({ allUsers: data });

          return data;
        } catch (error) {
          console.log("Error loading users from backend", error);
        }
      },
      getAllPlaces: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/places");
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const places = await resp.json();
          return places;
        } catch (error) {
          console.log("Error loading places from backend", error);
        }
      },

      getAllBands: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/bands");
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const bands = await resp.json();
          return bands;
        } catch (error) {
          console.log("Error loading bands from backend", error);
        }
      },
      uploadEventPicture: async (image) => {
        try {
          const token = localStorage.getItem("jwt-token");
          const formData = new FormData();
          formData.append("image", image);

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_event_picture",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Error uploading event picture");
          }

          const data = await response.json();
          console.log(data);

          // Asegúrate de que estás devolviendo un objeto con una propiedad url
          return { url: data.url };
        } catch (error) {
          console.log("Error uploading event picture", error);
        }
      },

      uploadEventMedia: async (imageUrl) => {
        try {
          const token = localStorage.getItem("jwt-token");

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_event_media",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ image: imageUrl }),
            }
          );

          if (!response.ok) {
            throw new Error("Error uploading event media");
          }

          const data = await response.json();
          console.log(data);

          // Asegúrate de que estás devolviendo un objeto con una propiedad url
          return { url: data.url };
        } catch (error) {
          console.log("Error uploading event media", error);
        }
      },
    },
  };
};

export default getState;
