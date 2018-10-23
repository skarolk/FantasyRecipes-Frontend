const worldsAPI = 'http://localhost:3000/api/v1/worlds'
const recipesAPI = 'http://localhost:3000/api/v1/recipes'
const ratingsAPI = 'http://localhost:3000/api/v1/ratings'
const ingredientsAPI = 'http://localhost:3000/api/v1/ingredients'

document.addEventListener('DOMContentLoaded', () => {

  getData()

  document.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.className === 'Star Wars') {
      let targetDiv = document.getElementById('Star Wars')
      targetDiv.style.display = 'block'
      document.getElementById("main_container").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end star wars 'if'
    else if (event.target.className === 'HarryPotter') {
      let targetDiv = document.getElementById('Harry Potter')
      targetDiv.style.display = 'block'
      document.getElementById("main_container").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end hp 'else if'
    else if (event.target.className === 'The Lord of the Rings') {
      let targetDiv = document.getElementById('The Lord of the Rings')
      targetDiv.style.display = 'block'
      document.getElementById("main_container").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end lotr 'else if'
    else if (event.target.innerText === 'Return to World Selection') {
      console.log(event.target);
      document.getElementById("main_container").style.display = 'block'
      let htmlCollection = document.getElementsByClassName('recipesContainer')
      let recipesContainer = Array.from(htmlCollection)
      recipesContainer.map(recipe => {
        recipe.style.display = 'none'
      })
      event.target.remove()
    } // end return to selection 'else if'
    else if (event.target.innerText === 'Like') {
      let ratingField = event.target.previousSibling
      fetch('http://localhost:3000/api/v1/ratings', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: true,
          recipe_id: event.target.id,
        })
      })  // post likes fetch end
      .then(result => result.json())
      .then(rating => {
        fetchRatings(rating)
      })
    } // end like 'else if'
    else if (event.target.innerText === 'Dislike') {
      let ratingField = event.target.previousSibling.previousSibling
      fetch('http://localhost:3000/api/v1/ratings', {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: false,
          recipe_id: event.target.id,
        })
      }) // post dislikes fetch end
      .then(result => result.json())
      .then(rating => {
        fetchRatings(rating)
      })
    } // end dislike 'else if'
  }) // click event listener end

}) // dom content loaded event listener end

function getData() {
  fetch('http://localhost:3000/api/v1/worlds')
  .then(results => results.json())
  .then(results =>
    results.map(result => createWorlds(result))
  )
} // getData end

function fetchRatings(rating) {
  fetch(ratingsAPI)
    .then(result => {
      return result.json()
    })
    .then(resultJSON => {
      matchingRatings = resultJSON.filter(eachRating => {
        return eachRating.recipe_id == rating.recipe_id
      }) // filter end
      return calculateLikePercentage(matchingRatings, rating)
    })
} // fetchRatings end
function calculateLikePercentage(matchingRatings, rating) {
  let upvote = matchingRatings.filter(eachRating => {
    return eachRating.score === true
  })
  let upvotePercentage = `${Math.ceil((upvote.length / matchingRatings.length) * 100)}% liked`
  let allPTags = document.querySelectorAll('p')
  let allPTagsArray = Array.from(allPTags)
  let pTag = allPTagsArray.find(ptag => {
    return ptag.id == rating.recipe_id
  })
  pTag.innerText = upvotePercentage
} // calculateLikePercentage end

function createWorlds(world) {
  // world selection
  let globalContainer = document.getElementsByClassName('main_container')
  let worldContainer = document.getElementById('links')
  let worldButton = document.createElement('a')
  worldButton.href = ''
  worldButton.innerText = world.name
  worldButton.image = world.image
  worldButton.className = world.name
  worldContainer.appendChild(worldButton)

  // world render
  let renderContainer = document.getElementById('renderContainer')
  let worldRecipesContainer = document.createElement('div')
  worldRecipesContainer.id = world.name
  worldRecipesContainer.className = 'recipesContainer'
  worldRecipesContainer.style.display = 'none'
  let worldHeader = document.createElement('h1')
  worldHeader.innerText = world.name

  // render recipes
  let recipesDiv = document.createElement('div')
  let recipes = world.recipes
  recipes.forEach(recipe => {
    let recipeHeader = document.createElement('h2')
    recipeHeader.innerText = recipe.name
    let recipeImage = document.createElement('img')
    recipeImage.src = recipe.image

    // render ratings
    let ratings = recipe.ratings
    let positiveRatings = ratings.filter(rating => rating.score === true)
    let percentRating = `${Math.ceil((positiveRatings.length / ratings.length) * 100)}% liked`
    let ratingP = document.createElement('p')
    ratingP.innerText = percentRating
    ratingP.id = recipe.id
    let upVote = document.createElement('button')
    upVote.id = recipe.id
    upVote.innerText = "Like"
    let downVote = document.createElement('button')
    downVote.id = recipe.id
    downVote.innerText = "Dislike"

    // render ingredients
    let ingredientsUl = document.createElement('ul')
    let ingredients = recipe.ingredients
    ingredients.forEach(ingredient => {
      let ingredientsLi = document.createElement('li')
      ingredientsLi.innerText = `${ingredient.quantity} ${ingredient.name}`
      ingredientsUl.appendChild(ingredientsLi)
    })

    let recipeInstructions = document.createElement('p')
    recipeInstructions.innerText = recipe.instructions
    //create recipes div
    recipesDiv.appendChild(recipeHeader)
    recipesDiv.appendChild(recipeImage)
    recipesDiv.appendChild(ratingP)
    recipesDiv.appendChild(upVote)
    recipesDiv.appendChild(downVote)
    recipesDiv.appendChild(ingredientsUl)
    recipesDiv.appendChild(recipeInstructions)
  })
  worldRecipesContainer.appendChild(worldHeader)
  worldRecipesContainer.appendChild(recipesDiv)
  renderContainer.appendChild(worldRecipesContainer)
} // create worlds end
