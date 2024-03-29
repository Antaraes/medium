export default{
    name:"feedback",
    type:"feedback",
    title:"Comment",
    fields:[
        {
            name:"name",
            type:"string",
        },
        {
            title:"Approved",
            name:"approved",
            type:"boolean",
        },
        {
            name:"email",
            type:"string",
        },
        {
            name:"comment",
            type:"text"
        },
        {
            name:"post",
            type:"reference",
            to:[{type:"post"}],
        }
    ]
}