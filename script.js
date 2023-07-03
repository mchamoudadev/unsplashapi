const accessKey = "";


let postsElement = document.querySelector("#posts");
let searchElement = document.querySelector("#searchElement");
let searchBtn = document.querySelector("#searchBtn");

let currentQuery = "books";
let currentPage = 1;
async function fetchImages(query = 'books', page = 1) {

    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=10&page=${page}`);

    const data = await response.json();
    let images = data.results;

    images.forEach(image => {
        console.log(image);
        postsElement.innerHTML += `
        <div class="post">
				<div class="user">
					<img
						src="${image.user.profile_image.large}"
						alt=""
						class="avatar"
					/>
					<span class="username">${image.user.username}</span>
				</div>
				<img
					src="${image.urls.small}"
					alt=""
				/>
				<div class="post-details">
					${showHeart(image.liked_by_user
        )}
				</div>
				<div class="like">
					<span><span class="count">${image.likes}</span> Likes</span>
				</div>
				<div>
					<p>
						<span class="username">${image.user.username}</span> ${image.description ? image.description : image.alt_description}
					</p>
				</div>
			</div>`;
    });
}

function showHeart(isLiked) {

    return isLiked ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
  ` : `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 red">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
`;

}

searchBtn.addEventListener('click', function () {

    let query = searchElement.value;
    if (!query) return alert("Please enter valid info");
    currentQuery = query;
    postsElement.innerHTML = "";
    currentPage = 1;
    searchElement.value = "";
    fetchImages(currentQuery, currentPage);
});

window.addEventListener('scroll', function () {

    console.log("window.innerHeight " + window.innerHeight + "px");
    console.log("window.scrollY " + window.scrollY + "px");
    console.log("document.body.offsetHeight " + document.body.offsetHeight + "px");

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        currentPage = currentPage + 1;
        fetchImages(currentQuery, currentPage);
    }
});
// fetch the initial page
fetchImages();