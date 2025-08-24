import * as Carousel from "./Carousel.mjs";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.6.7/dist/esm/axios.min.js";
// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");
const getcarouselInner = document.getElementById("carouselInner");
// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_2xxAszMKX5pmC4S7gi9nDqxhZHwQUDoNTMu3CCeH3PJc73gXkIBEym1zWO3e61cj";

axios.defaults.headers.common["x-api-key"] =
  "live_2xxAszMKX5pmC4S7gi9nDqxhZHwQUDoNTMu3CCeH3PJc73gXkIBEym1zWO3e61cj";
axios.defaults.headers.common["Accept"] = "application/json";

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
  "x-api-key",
  "live_2xxAszMKX5pmC4S7gi9nDqxhZHwQUDoNTMu3CCeH3PJc73gXkIBEym1zWO3e61cj"
);

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};
/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
// (async function initialLoad() {
//   try {
//     const response = await fetch(
//       "https://api.thecatapi.com/v1/breeds",
//       requestOptions
//     );
//     console.log(response);

//     const jsonData = await response.json();
//     //   console.log(response);
//     console.log(jsonData);
//     for (let i = 0; i < jsonData.length; i++) {
//       let option = document.createElement("option");
//       option.setAttribute("value", jsonData[i].id);
//       option.textContent = jsonData[i].name;
//       breedSelect.appendChild(option);
//     }

//     // Automatically select first item and trigger handler
//     if (breedSelect.options.length > 0) {
//       breedSelect.selectedIndex = 0;
//       handleGetBreedInfo({ target: breedSelect }); // manually call handler
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// })();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */



// breedSelect.addEventListener("change", handleGetBreedInfo);

// async function handleGetBreedInfo(event) {
//   try {
//     console.log("you called me", event.target.value);
//     const response = await fetch(
//       `https://api.thecatapi.com/v1/images/search?breed_id=${event.target.value}&limit=5`,
//       requestOptions
//     );
//     const jsonData = await response.json();
//     // Clear previous paragraphs
//     Carousel.clear();
//     console.log(jsonData, jsonData.length);
//     for (let i = 0; i < jsonData.length; i++) {
//       let img = Carousel.createCarouselItem(
//         jsonData[i].url,
//         jsonData[i].breeds[0].name,
//         jsonData[i].id
//       );
//       Carousel.appendCarousel(img);
//       Carousel.start();
//     }
//     const res = await fetch(
//       `https://api.thecatapi.com/v1/breeds/${event.target.value}`,
//       requestOptions
//     );
//     const jData = await res.json();
//     infoDump.innerHTML = "";
//     let p = document.createElement("p");
//     p.textContent = jData.description;
//     // Carousel.appendCarousel(p);
//     infoDump.appendChild(p);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

(async function initialLoad() {
    try {
        const response = await axios.get(
            "https://api.thecatapi.com/v1/breeds"
        );
        for (let i = 0; i < response.data.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", response.data[i].id);
            option.textContent = response.data[i].name;
            breedSelect.appendChild(option);
        }

        // Automatically select first item and trigger handler
        if (breedSelect.options.length > 0) {
            breedSelect.selectedIndex = 0;
            handleGetBreedInfo({ target: breedSelect }); // manually call handler
        }
    } catch (error) {
        console.error(error.message);
    }
})();

breedSelect.addEventListener("change", handleGetBreedInfo);

async function handleGetBreedInfo(event) {
    try {
        const response = await axios(
            `https://api.thecatapi.com/v1/images/search?breed_id=${event.target.value}&limit=5`,
            {
                onDownloadProgress: updateProgess
            }
        );
        // Clear previous paragraphs
        Carousel.clear();
        for (let i = 0; i < response.data.length; i++) {
            let img = Carousel.createCarouselItem(
                response.data[i].url,
                response.data[i].breeds[0].name,
                response.data[i].id
            );
            Carousel.appendCarousel(img);
          Carousel.start();
        }
        const res = await axios(
            `https://api.thecatapi.com/v1/breeds/${event.target.value}`
        );
        infoDump.innerHTML = "";
        let p = document.createElement("p");
        p.textContent = res.data.description;
        infoDump.appendChild(p);
        progressBar.style.width = "100%";
    } catch (error) {
        console.error(error.message);
        progressBar.style.width = "0%";
    }
}

/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */
axios.interceptors.request.use(request => {
  if (progressBar) {
    progressBar.style.width = "0%";
    let body = document.querySelector("body");
    body.style.cursor = "progress"; // show loading cursor

  }

  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  return request;
});


axios.interceptors.response.use((response) => {
  if (progressBar) {
    progressBar.style.width = "100%";
    let body = document.querySelector("body");
    body.style.cursor = "default"; // reset cursor
  }

  response.config.metadata.endTime = new Date().getTime();
  response.config.metadata.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;

  console.log(`Request took ${response.config.metadata.durationInMS} milliseconds.`)
  return response;
},
  (error) => {
    if (progressBar) {
      progressBar.style.width = "100%";
      let body = document.querySelector("body");
      body.style.cursor = "default"; // reset cursor

    }

    error.config.metadata.endTime = new Date().getTime();
    error.config.metadata.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;

    console.log(`Request took ${error.config.metadata.durationInMS} milliseconds.`)
    throw error;
  });
/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */
function updateProgess(progressEvent) {
  console.log(progressEvent);
  const { loaded, total } = progressEvent;
  if (total) {
    const percent = Math.floor((loaded / total) * 100);
    progressBar.style.width = percent + "%";
  }
}
/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
  console.log("img Id is", imgId);
  try {
    let existRes = await axios.get("https://api.thecatapi.com/v1/favourites", {
      params: { image_id: imgId }
    });
    console.log("existing fav is", existRes.data);
    // if image is already favorited then delete it
    if (existRes.data.length > 0) {
      console.log("I am deleting", existRes.data[0].id);
      await axios.delete(
        `https://api.thecatapi.com/v1/favourites/${existRes.data[0].id}`
      );
    } else {
      console.log("I am posting");
      const response = await axios.post(
        "https://api.thecatapi.com/v1/favourites",
        { image_id: imgId }
      );
    }

    progressBar.style.width = "100%";
  } catch (error) {
    console.error(error.message);
    progressBar.style.width = "0%";
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
getFavouritesBtn.addEventListener("click", getFavourites);

async function getFavourites(event) {
  try {
    
    infoDump.innerHTML = "";
    let existRes = await axios.get("https://api.thecatapi.com/v1/favourites");
    console.log("fav list is", existRes.data);
    Carousel.clear();
    
    for (let i = 0; i < existRes.data.length; i++) {
      console.log("url is", existRes.data[i].image.url);
      console.log("image id is", existRes.data[i].image_id);

      let img = Carousel.createCarouselItem(existRes.data[i].image.url, "Fav Cat", existRes.data[i].image_id)
      Carousel.appendCarousel(img);
      Carousel.start();
    }
  }
  catch (error) {
    console.error(error.message);
  }
}

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */
