// named modules - has a name can import as many as possible 
const message = "some message from my module.js";
const name = "hariprasad"
const location = 'chennai'

const getGreeting = (name) => {
    return `Welcome to the course ${name}`
}

export { getGreeting,message, name, location as default };
    
