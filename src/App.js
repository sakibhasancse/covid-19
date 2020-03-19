import React from "react"
import Axios from "axios"
import "./style/styleApp.css"
// import { Button } from 'react-bootstrap';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.getCountryData =this.getCountryData.bind(this);
    }

    state={
        confirmed:0,
        recovered:0,
        deaths:0,
        countries:[]
    }

    componentDidMount(){
        this.getData();
    }
    async getData(){
        const resApi = await Axios.get("https://covid19.mathdro.id/api");
        const resCountry =await Axios.get("https://covid19.mathdro.id/api/countries");
        const countries=Object.keys(resCountry.data.countries)
        this.setState({
            confirmedc:resApi.data.confirmed.value,
            recoveredc:resApi.data.recovered.value,
            deathsc:resApi.data.deaths.value,
            countries
        })
    }
    async getCountryData(e){
        try{
            const res = await Axios.get(`https://covid19.mathdro.id/api/countries/${e.target.value}`);

            this.setState({
                confirmed:res.data.confirmed.value,
                recovered:res.data.recovered.value,
                deaths:res.data.deaths.value
    
    
            });
        }
      
    catch(err){
    if(err.response.status === 404){
        this.setState({
            confirmed:"Not Found",
            recovered:"Not Found",
            deaths:"Not Found"


        })

    }
    


}
    }
    renderCountryOptions(){
      return this.state.countries.map((country,i)=>{
      return <option key={i}>{country}</option>
      })

    }
    
    render(){

        return(
        
        <div >
       
            <div className="shadow-sm p-3 mb-5 bg-white rounded">
                <h2 className="text-center font-weight-bold">Covid-19 live update</h2>
            </div>
            <div className="container mx-auto px-4">
            <div className="row">
            <div>
                     <h3>Worldwide</h3>   <br />
                     </div>
                  

            </div>
                 <div className="row ">
                   
                    <div className=" box1  shadow-lg p-3 mb-5 bg-white   col-12 col-sm-12 col-md-3 col-mx-3">
                        <h3>Confirmed</h3>
                        <h2  className="tc">{this.state.confirmedc}</h2>
                    </div>
                    <div className="box2  shadow-lg p-3 mb-5 bg-white  col-12 col-sm-12 col-md-3 col-mx-3 ">
                        <h3>Recoverd</h3>

                        <h2 className="tr">{this.state.recoveredc}</h2>
                    </div>
                    <div className="box3  shadow-lg p-3 mb-5 bg-white  col-12 col-sm-12 col-md-3 col-mx-3 ">
                        <h3>Deaths</h3>

                        <h2 className="td">{this.state.deathsc}</h2>
                    </div>

                </div>
                </div>
                {/* //change  */}
                <div className="container mx-auto px-4">
                <div className="pb-3 row  flex">
                        <div className="col-12 col-sm-12 col-md-9 col-mx-9">
                        <h3>Country :{this.getCountryData}</h3>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-3 col-mx-3">
                        <select onChange={this.getCountryData} className=" browser-default custom-select">
                            {this.renderCountryOptions()}
                        </select>
                        </div>       
                </div>
                 <div className="row ">
                   
                    <div className=" box1  shadow-lg p-3 mb-5 bg-white   col-12 col-sm-12 col-md-3 col-mx-3 ">
                        <h3>Confirmed</h3>
                        <h2  className="tc">{this.state.confirmed}</h2>
                    </div>
                    <div className="box2  shadow-lg p-3 mb-5 bg-white  col-12 col-sm-12 col-md-3 col-mx-3 ">
                        <h3>Recoverd</h3>

                        <h2 className="tr">{this.state.recovered}</h2>
                    </div>
                    <div className="box3  shadow-lg p-3 mb-5 bg-white  col-12 col-sm-12 col-md-3 col-mx-3 ">
                        <h3>Deaths</h3>

                        <h2 className="td">{this.state.deaths}</h2>
                    </div>
                    <div >
                        <h2 className="profile ">Created by <a href="https://www.facebook.com/SakibHasan99">Sakib Hasan😍</a></h2>
                    </div>

                </div>
            </div>
        </div>
        
        );
    }
}