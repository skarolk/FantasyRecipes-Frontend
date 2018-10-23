document.addEventListener('DOMContentLoaded', () => {

  getData()

  document.addEventListener('click', (event) => {
    event.preventDefault()

    if (event.target.innerText === 'Star Wars') {
      let targetDiv = document.getElementById(`${event.target.innerText}`)
      targetDiv.style.display = 'block'
      document.getElementById("worldContainer").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end star wars 'if'
    else if (event.target.innerText === 'Harry Potter') {
      let targetDiv = document.getElementById(`${event.target.innerText}`)
      targetDiv.style.display = 'block'
      document.getElementById("worldContainer").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end hp 'else if'
    else if (event.target.innerText === 'The Lord of the Rings') {
      let targetDiv = document.getElementById(`${event.target.innerText}`)
      targetDiv.style.display = 'block'
      document.getElementById("worldContainer").style.display = 'none'
      let returnButton = document.createElement('button')
      returnButton.innerText = 'Return to World Selection'
      returnButton.id = "returnButton"
      let renderContainer = document.getElementById('renderContainer')
      renderContainer.appendChild(returnButton)
    } // end lotr 'else if'
    else if (event.target.innerText === 'Return to World Selection') {
      console.log(event.target);
      document.getElementById("worldContainer").style.display = 'block'
      let htmlCollection = document.getElementsByClassName('recipesContainer')
      let recipesContainer = Array.from(htmlCollection)
      debugger
      recipesContainer.map(recipe => {
        recipe.style.display = 'none'
      })
      event.target.remove()
    } // end return to selection 'else if'
    else if (event.target.innerText === 'Like') {
      debugger
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
      }) // post likes fetch end
    } // end like 'else if'
    else if (event.target.innerText === 'Dislike') {
      debugger
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

// function getRecipes() {
//   fetch('http://localhost:3000/api/v1/worlds')
//   .then(results => results.json())
//   .then(recipes => {
//     recipes.map(recipe => makeRecipes(recipe))
//   })
// }
//
// function makeRecipes(recipe) {
//   let recipeIdentifier = recipe.id
//   let allRatings = recipe.ratings
//   let positiveRatings = ratings.filter(rating => rating.score === true)
//   let percentRating = (positiveRatings.length / ratings.length) * 100
//   console.log(percentRating)
// }
//
// function calculateRating(recipeId) {
//
//   if (recipe.id === recipeId) {
//     let ratings = recipe.ratings
//     let positiveRatings = ratings.filter(rating => rating.score === true)
//     let percentRating = (positiveRatings.length / ratings.length) * 100
//     console.log(percentRating)
//   }
// }

function createWorlds(world) {
  // world selection
  let worldContainer = document.getElementById('worldContainer')
  let worldButton = document.createElement('button')
  worldButton.innerText = world.name
  worldButton.image = world.image
  worldButton.id = world.id
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
