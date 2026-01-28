# By Breed Dataset

This repo contains a data set of cat and dog breeds. 

## Challenges

### Challenge 1

Create a new React Native project. 

Import the by breed JSON and by Breed js files. The JS file imports the JSON and turns what's there into an array. 

You should be able to import `cats` and or `dogs` from `breeds.js` and have a list of objects that represent each breed. 

### Challenge 2

Use the FlatList component in React Native to display the names of each animal. 

Use a Component to Render each animal in the FlatList. 

You should style the FlatList to fill the screen. 

### Challenge 3 

Now display the features/properties of each breed. Keep in mind that these property names are different for each breed. 

Since each breed only shares a name and does not have an array of properties. You can make an array or the existing property names using: 

```JS
const keys = Object.keys(data)
```

Where `data` is the animal data object, `keys` will be an array of key names. 

For example: 

```JS
const obj = {a: 0, b: 1, c: 2}
const keys = Object.keys(obj)
// keys = ['a', 'b', 'c']
```

You can now map over keys to generate a list of properties. For example: 

```JS
const obj = {a: 0, b: 1, c: 2}
const keys = Object.keys(obj)
keys.map(key => `key = ${obj[key]}`)
// keys = ['a = 0', 'b = 1', 'c = 2']
```

Use this technique to display the properties and values of each animal. You should filter out the 'name' property since this might display twice. 

### Challenge 3

Use your styles to place the name and property name on the left of the screen and the value of the property on the right side. 

To do this you'll need to flex. Put both element in a separate text elements. Use Flex and space-between on the parent element. 

### Challenge 4 

Display the average rating for each breed. Calculate this by adding all of the property values for a breed and dividing by the number of values. 

Display the average rating to the right of the name. 

### Challenge 5 

Add some styles. 

- Make the breed name larger
- Add some space on the left and right so the text doesn't touch the edge of the screen. 
- Add some vertical space between rows. 
- Try adjusting the typographic styles like font-family, font-size, font-weight, and color. 

### Challenge 6 

Add a search field to search the breed list. 

You'll need a `TextInput` component. You should use the controlled component pattern to store the value entered in the textInput as a state variable. 

Use the `KeyboardAvoidingView` to prevent the search field from being covered by the keyboard. 

Use filter with the search term on the array of animal breeds. Then use the filtered array as the source array passed to flat list. 

### Challenge 7 

Add a button that switches between the cat and the dog list. 

Use the Button or other component to set a value on a state variable. You can use this variable to choose which list to display. 