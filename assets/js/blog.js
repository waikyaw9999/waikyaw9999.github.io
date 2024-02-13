//Loaidng blog posts from the wordpress site without using any javascript library.
async function getBlogPosts() {
  try {
    const response = await fetch('https://webmarket101.net/wp-json/wp/v2/posts');
    const posts = await response.json();

    const blogPosts = posts.map((post) => {
      
      return {
        title: post.title.rendered,
        content: post.excerpt.rendered,
        image: post.fimg_url,
        url: post.link
      };
    });

    return blogPosts;
  } catch (error) {
    console.error('Error retrieving blog posts:', error);
    return [];
  }
}

function getPostObejct(post) {
    post.content = post.content.replace(/<p>|<\/p>/g, '');
    return post = {
        title: post.title,
        content: post.content,
        image: post.image,
        url: post.url
    };
}

function getHtmlString (post) {
    let htmlString = `
    <a href="${post.url}" target="_blank">
        <figure class="blog-banner-box">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
        </figure>

        <div class="blog-content">
            <h3 class="h3 blog-item-title">${post.title}</h3>
            <p class="blog-text">${post.content}</p>
        </div>
    </a>
    `;
    return htmlString;
}

async function loadBlogPosts(){
    const posts = await getBlogPosts();
    let toAdd = document.createDocumentFragment();
    document.getElementById('blog-posts-list').innerHTML = '';
    posts.forEach(post => {
        let htmlString = getHtmlString(getPostObejct(post));
        let newLi = document.createElement('li');
        newLi.className = 'blog-post-item';
        newLi.innerHTML = htmlString; 
        toAdd.appendChild(newLi);
    });
    document.getElementById('blog-posts-list').appendChild(toAdd);
}
window.onload = loadBlogPosts;