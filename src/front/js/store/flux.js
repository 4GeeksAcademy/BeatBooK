const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      currentUser: null,
      user: null,
      message: null,
      event: [],
      allEvents: [],
      allUsers: [],
      singleUser: [],
      bands:[],
      band: [],
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
      getPlace: async (place_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/places/${place_id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch place');
          }
          const data = await response.json();
          setStore({ place: data });
          return data;
        } catch (error) {
          console.error(error);
        }
      },

      getPlaceEvents: async (place_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/places/${place_id}/events`);
          if (!response.ok) {
            throw new Error("Place not found");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getEventsByCategory: async (category_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/musical_categories/${category_id}/events`);
          if (!response.ok) {
            throw new Error("Failed to fetch events");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          return [];
        }
      },

      getCategory: async (category_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/musical_categories/${category_id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch category");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          return null;
        }
      },

      getPlaceEvents: async (place_id) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/places/${place_id}/events`);
          if (!response.ok) {
            throw new Error("Place not found");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          return [];
        }
      },
      getEventsByCategory: async (category_id) => {
        try {
            const response = await fetch(process.env.BACKEND_URL + `/api/musical_categories/${category_id}/events`);
            if (!response.ok) {
                throw new Error("Failed to fetch events");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getCategory: async (category_id) => {
      try {
          const response = await fetch(process.env.BACKEND_URL + `/api/musical_categories/${category_id}`);
          if (!response.ok) {
              throw new Error("Failed to fetch category");
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.log(error);
          return null;
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
        // Obtén la información del usuario aquí...
      },

      logOut: () => {
        // Borra el objeto user del estado global
        setStore({ user: null });

        // Borra el token del almacenamiento local
        localStorage.removeItem("jwt-token");
        localStorage.removeItem("user");

        // Muestra un mensaje de éxito
        // toast.success("Has cerrado sesión correctamente");
      },
      checkUser: async () => {
        const token = localStorage.getItem("jwt-token");
        const user = JSON.parse(localStorage.getItem("user"));

        if (token && user) {
          setStore({ user: user });
        }
        // console.log("user", user);
        // console.log("token", token);
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
            setStore({ user: null });
            throw new Error("Token inválido o expirado");
          }

          if (!resp.ok) {
            throw new Error("Error al obtener datos privados");
          }

          const data = await resp.json();

          // Actualiza el estado global con la información obtenida
          setStore({ currentUser: data });
          setStore({ user: data });


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

      createBand: async (bandData) => {
        console.log(bandData)
        try {
          const token = localStorage.getItem("jwt-token"); // Obtén el token del almacenamiento local

          const response = await fetch(
            process.env.BACKEND_URL + "/api/bands",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Incluye el token en los headers
              },
              body: JSON.stringify(bandData),
            }
          );

          if (!response.ok) {
            throw new Error("Error creating band");
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.log("Error creating band", error);
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
            console.log('Código de estado:', response.status);
            console.log('Cuerpo de la respuesta:', await response.text());
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
      getEvents: async (searchTerm) => {  //Revisar!!!!
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

      getUser: async (id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + `/api/users/${id}`
          );
          const data = await resp.json();
          setStore({ singleUser: data})
          return data;
        } catch (error) {
          console.log("Error loading user from backend", error);
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
//---------------------- BANDAS ----------------------------------------------------//
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
          const data = await resp.json();
          setStore({ band: data })
          return data;
        } catch (error) {
          console.log("Error loading band from backend", error);
          throw error;
        }
      },

      uploadBandPicture: async (image, bandId) => {
        console.log("uploadBandPicture se ha llamado");
        try {
          const token = localStorage.getItem("jwt-token");
          const formData = new FormData();
          formData.append("image", image);
          formData.append("band_id", bandId); // Agrega el ID del band al formulario

          console.log("Subiendo imagen con token:", token);

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_profile_band",
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
            throw new Error("Error uploading user picture");
          }

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          console.log("URL de la imagen:", data.url);

          return { url: data.url };
        } catch (error) {
          console.log("Error uploading user picture", error);
        }
      },

      uploadBannerBand: async (banner, bandId) => {
        console.log("uploadBandBanner se ha llamado");
        try {
          const token = localStorage.getItem("jwt-token");
          const formData = new FormData();
          formData.append("banner", banner);
          formData.append("band_id", bandId); // Agrega el ID del band al formulario

          console.log("Subiendo imagen con token:", token);

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_banner_band",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          console.log(banner);
          if (!response.ok) {
            throw new Error("Error uploading user picture");
          }

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          console.log("URL de la imagen:", data.url);

          return { url: data.url };
        } catch (error) {
          console.log("Error uploading Banner band picture", error);
        }
      },
//------------------------------------------------------------------------------------------//

      getPlace: async (placeId) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/places/" + placeId
          );
          if (!resp.ok) {
            throw new Error(`HTTP error! status: ${resp.status}`);
          }
          const data = await resp.json();
          setStore({ place: data })
          return data;
        } catch (error) {
          console.log("Error loading place from backend", error);
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

      uploadUserPicture: async (image, userId) => {
        console.log("uploadUserPicture se ha llamado");
        try {
          const token = localStorage.getItem("jwt-token");
          const formData = new FormData();
          formData.append("image", image);
          formData.append("user_id", userId); // Agrega el ID del user al formulario

          console.log("Subiendo imagen con token:", token);

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_profile_image",
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
            throw new Error("Error uploading user picture");
          }

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          console.log("URL de la imagen:", data.url);

          return { url: data.url };
        } catch (error) {
          console.log("Error uploading user picture", error);
        }
      },

      uploadBannerPicture: async (banner, userId) => {
        console.log("uploadUserPicture se ha llamado");
        try {
          const token = localStorage.getItem("jwt-token");
          const formData = new FormData();
          formData.append("banner", banner);
          formData.append("user_id", userId); // Agrega el ID del user al formulario

          console.log("Subiendo imagen con token:", token);

          const response = await fetch(
            process.env.BACKEND_URL + "/api/upload_banner_image",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            }
          );
          console.log(banner);
          if (!response.ok) {
            throw new Error("Error uploading user picture");
          }

          const data = await response.json();
          console.log("Respuesta del servidor:", data);
          console.log("URL de la imagen:", data.url);

          return { url: data.url };
        } catch (error) {
          console.log("Error uploading user picture", error);
        }
      },

      createReview: async (reviewData) => {
        try {
          const token = localStorage.getItem("jwt-token");

          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);

          const response = await fetch(
            `${process.env.BACKEND_URL}/api/reviews`,
            {
              method: 'POST',
              headers: myHeaders,
              body: JSON.stringify(reviewData),
              redirect: 'follow'
            }
          );

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
      deleteReview: async (reviewId) => {
        try {
          const response = await fetch(process.env.BACKEND_URL + `/api/reviews/${reviewId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          return response.json();
        } catch (error) {
          console.error('Error deleting review', error);
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
    }
  }
};

export default getState;
