const googleUrl = (searchQuery) =>
   `https://www.googleapis.com/customsearch/v1?key=AIzaSyCH0zbNTYrwbBg2JFZVwCKTqpTA8RgFMxc&cx=053664ba4ac1a4447&q=${searchQuery}`;

const unsplashUrl = (searchQuery) =>
   `https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&per_page=20&client_id=RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw`;

const wikipediaUrl = (searchQuery) =>
   `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQuery}&format=json&origin=*`;
