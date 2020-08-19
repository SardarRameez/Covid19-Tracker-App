const url="https://covid19.mathdro.id/api"
    export async function fetchData(country){
        let changeableUrl=url;
        if(country){
            changeableUrl=url+"/countries/"+country;
        }
        try {
            const response=await fetch(changeableUrl)
            const data=await response.json()
            return data
            
        } catch (error) {
            console.log(error)
        }
    }
    // Fetch Daily data
    export async function fetchDailyData(){
        try {
            const response=await fetch(url+"/daily")
            const data=await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }

    // Countries
    export async function fetchCountries(){
        try {
            const response=await fetch(url+"/countries")
            const data=await response.json()
            return data
            
        } catch (error) {
            console.log(error)
        }
    }

    // Pakistan Covid-19 Data

    export async function fetchPakistanData(){
        const response=await fetch("https://api.apify.com/v2/datasets/9eUGCilmJ8HDf60mL/items?format=json&clean=1")
        const data=await response.json()
        return data
    }