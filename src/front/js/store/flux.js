const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUser: null,
      user: null,
      message: null,
      event: [],
      allEvents: [],
      allUsers: [],
      bands: [],
      places: [],
      allCategories: [],
      userFavorite: [],
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
          localStorage.setItem("user", JSON.stringify(data));

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
      checkUser: async () => {
        const token = localStorage.getItem("jwt-token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
          setStore({ user: user });
        }
        console.log("user", user);
        console.log("token", token);
        console.log("user_id", user.id);
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
            setStore({ currentUser: null });
            throw new Error("Token inválido o expirado");
          }

          if (!resp.ok) {
            throw new Error("Error al obtener datos privados");
          }

          const data = await resp.json();

          // Actualiza el estado global con la información obtenida
          setStore({ currentUser: data });

          return data;
        } catch (error) {
          console.log("Error al obtener datos privados", error);
          throw error;
        }
      },

      createEvent: async (eventData) => {
        try {
          const token = localStorage.getItem("jwt-token"); // Obtén el token del almacenamiento local

          const response = await fetch(
            process.env.BACKEND_URL + "/api/events",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Incluye el token en los headers
              },
              body: JSON.stringify(eventData),
            }
          );

          if (!response.ok) {
            throw new Error("Error creating event");
          }

          const data = await response.json();
          // console.log(data)
          // Aquí puedes actualizar tu store con la nueva información del evento si es necesario
          return data;
        } catch (error) {
          console.log("Error creating event", error);
        }
      },
      addAssistances: async (eventId, userId) => {
        try {
          const token = localStorage.getItem("jwt-token"); // Obtén el token del almacenamiento local

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/events/${eventId}/add_assistances`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Incluye el token en los headers
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          if (!response.ok) {
            throw new Error("Error al agregar asistencia");
          }

          const data = await response.json();

          // Aquí puedes actualizar el estado global o hacer algo con los datos recibidos

          return data;
        } catch (error) {
          console.log("Error al agregar asistencia", error);
          throw error;
        }
      },
      removeAssistances: async (eventId, userId) => {
        try {
          const token = localStorage.getItem("jwt-token"); // Obtén el token del almacenamiento local

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/events/${eventId}/remove_assistances`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Incluye el token en los headers
              },
              body: JSON.stringify({ user_id: userId }),
            }
          );

          if (!response.ok) {
            throw new Error("Error al eliminar asistencia");
          }

          const data = await response.json();

          // Aquí puedes actualizar el estado global o hacer algo con los datos recibidos

          return data;
        } catch (error) {
          console.log("Error al eliminar asistencia", error);
          throw error;
        }
      },
      getAssistanceStatus: async (eventId, userId) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/events/${eventId}/assistances/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt-token")}`
            },
          });

          if (!resp.ok) {
            throw new Error("Error al obtener el estado de asistencia");
          }

          const data = await resp.json();
          return data;
        } catch (error) {
          console.log("Error al obtener el estado de asistencia", error);
          throw error;
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

      getAllEvents: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/events");
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const data = await resp.json();

          setStore({ allEvents: data });

          return data;
        } catch (error) {
          console.log("Error loading users from backend", error);
          throw error;
        }
      },
      getUser: async (id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + `/api/users/${id}`
          );
          const data = await resp.json();
          setStore({ user: data });
          return data;
        } catch (error) {
          console.log("Error user not found", error);
        }
      },

      getAllUsers: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/users");
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const data = await resp.json();

          // Actualiza el estado global con la información obtenida
          setStore({ allUsers: data });

          return data;
        } catch (error) {
          console.log("Error loading users from backend", error);
          throw error;
        }
      },

      getAllPlaces: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/places");
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const data = await resp.json();
          setStore({ places: data });
          return data;
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
          const data = await resp.json();

          setStore({ bands: data });
          return data;
        } catch (error) {
          console.log("Error loading bands from backend", error);
        }
      },

      getBand: async (bandId) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/bands/" + bandId
          );
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const band = await resp.json();
          return band;
        } catch (error) {
          console.log("Error loading band from backend", error);
          throw error;
        }
      },
      uploadEventPicture: async (image, eventId) => {
        console.log("uploadEventPicture se ha llamado");
        try {
          const token = localStorage.getItem("jwt-token");
          const formData = new FormData();
          formData.append("image", image);
          formData.append("event_id", eventId); // Agrega el ID del evento al formulario

          console.log("Subiendo imagen con token:", token);

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
          console.log(image);
          if (!response.ok) {
            throw new Error("Error uploading event picture");
          }

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          console.log("URL de la imagen:", data.url);

          return { url: data.url };
        } catch (error) {
          console.log("Error uploading event picture", error);
        }
      },

      uploadEventMedia: async (files, eventId) => {
        try {
          const token = localStorage.getItem("jwt-token");

          const formData = new FormData();
          for (const file of files) {
            formData.append("images", file); // Asegúrate de que el servidor espera "images" como el nombre del campo para los archivos
          }
          formData.append("event_id", eventId); // Asegúrate de que el servidor espera "event_id" como el nombre del campo para el id del evento

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_event_media",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );

          if (!response.ok) {
            const errorData = await response.json(); // Intenta obtener más información sobre el error del cuerpo de la respuesta
            throw new Error("Error uploading event media: " + JSON.stringify(errorData));
          }

          const data = await response.json();
          console.log(data);

          // Asegúrate de que estás devolviendo un objeto con una propiedad urls que es un array
          return { urls: data.urls };
        } catch (error) {
          console.log("Error uploading event media", error);
        }
      },
      createReview: async (reviewData) => {
        try {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Cookie", ".Tunnels.Relay.WebForwarding.Cookies=CfDJ8Pjr1fvz4XtAuncu_xvzDVI7iHDJmu_gqZGcDudb6ZNmq-QOkM7O9bICnetvkogFByPc3NXlx10vjcoCR7T96n2b1npFkhRPbmQ_mRnPVbbtjScy1uYLoKSmSWJpJ1niOaTvMlB2PbgnLDQtsDFivO7iEo1FEe7CVd01s9yasrozoCeokWc7A5kz9NExeHt4fvpKWR0BpDIoVAnEP_Hw3WGFtXv5bdIetHUTHxUnGL5i69xhyEYmhWOYxvCfMMfp28ns74katHwGdrAy001DnYGRfbot3lrvJgHB8ID2cy1zKu7nJHHmHQaloyurchLxgzz-WTUU2HMPlYYoybUXKlvxUEPW2mZc19J8_9zr9WdvmmVHcJxXPVNaXQzEareD64bA_Qs8wuITUsqFqvfeS1gQ1HXRtZv9owR8_G4nppykn_H9h9Oft-0pjgB_WZrBcx2aDZbzXSgidcKv-mhukz8B1dWIyZx26UDPrTn4DFuo4OIlXCWYpyYDv0k4nwQ-A4gG0-LDwuHML457zhL9tLU-zf231na3ADo5AaucvHDVLcj8BbTsR83DfFwMa9iI7rj3AVGNYPwCB00JCKCcZGfhImfAMz-RKLtG1zVNDV0CFGITC6M2HuEnpNlB9xHPsAq09mDjFUyaCYtjbFbpFC7tuy80kecBXHZSfqEA82urMoMEd5DkhrCiUcAq9kV1IyTksf_lOHppR7Sc_2LQeh3CVlmA7TU7jJuAi90iY6nr-p0JYUlh1Hyo51fzmQa5ZTRgB6M22QOLye9cU5Y3Q74wEWgIURXxffj-fPd2eiqM4NW7AyQ5n7Amldm1Ry2zW-VdYM2t2UczY7vqXPGQ1c3rpD7mTJRHpmCIN8Rw5JcSiY6mPyKjJpS7LVHfmCaEmiJ8yMzBINQtQwcd5mhL-78Wr3tMVd7o5PQPnpgYuZM4aegRbAIl7mnGDD5CVDlh22sflqoA6N_WCjfIANX-IHo-v_Szt5lfgeUfkqtARzj1");

          const response = await fetch("https://bug-free-bassoon-69gq57r4pjr5fr96r-3001.app.github.dev/api/reviews", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(reviewData),
            redirect: 'follow'
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Error creating review", error);
          throw error;
        }
      },

      getMusicalCategories: async () => {
        try {
          const response = await fetch(process.env.BACKEND_URL + '/api/musical_categories');
          if (!response.ok) {
            throw new Error('Failed to fetch musical categories');
          }
          const data = await response.json();
          setStore({ allCategories: data });
          return data

        } catch (error) {
          console.error('Error fetching musical categories:', error);
          // Manejar el error de acuerdo a tus necesidades
        }
      },
      saveUserCategory: async (id, categoryId) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `user/${id}/categories`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ categories: [categoryId] }), // Envía un arreglo con el ID de la categoría
          });
          if (!response.ok) {
            throw new Error('Failed to save user category');
          }
          const data = await response.json();
          setStore({ userFavorite: data });
          console.log(data.message); //
        } catch (error) {
          console.error('Error saving user category:', error);
          // Manejar el error de acuerdo a tus necesidades
        }
      }

    }
  };
};

export default getState;
