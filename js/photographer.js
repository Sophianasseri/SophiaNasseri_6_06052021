let photographerData = [];

const fetchPhotographer = async () => {
  await fetch("./js/data.json")
    .then((res) => res.json())
    .then((data) => (photographerData = data.photographers));
};

const getUrlId = new URLSearchParams(location.search).get("id");
