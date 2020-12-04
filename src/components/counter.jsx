import React, { Component } from 'react';

class Counter extends Component {
    state = {
        imgUrl: 'http://picsum.photos/200',
        tags: ['tag1','tag2','tag3']
    }

    style = {
        fontSize : 10,
        fontWeight : "bold"
    }

    renderTags(){
        if(this.state.tags.length===0){
            return <p>There are no tags</p>
        }
        return <ul>{this.state.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>
    }

    render() { 

        return (
            // <div>
            //     <img src={this.state.imgUrl} alt=""/>
            //     <span style={{ fontSize:30 }} className={this.getBadgeClasses()}> {this.formatCount()} </span>
            //     <button className="btn btn-secondary btn-sm">Increment</button>
            //     <ul>
            //         { this.state.tags.map(tag=>
            //             <li key={tag}>{tag}</li>  //key need be unique.
            //         )}
            //     </ul>
            // </div>

            <div className ="row">
                <div className="col-1">
                    <span 
                        //style={{ fontSize:30 }} 
                        className={this.getBadgeClasses()}
                    > 
                        {this.formatCount()} 
                    </span>
                </div>
                <div className="col">
                    <button 
                        //if wanna pass parameters into the function, need array method.
                        //onClick = { ()=> this.handleIncrement(product)}
                        onClick={()=>this.props.onIncrement(this.props.counter)}
                        className="btn btn-secondary btn-sm"
                    >
                        +
                    </button>
                    <button 
                        //if wanna pass parameters into the function, need array method.
                        //onClick = { ()=> this.handleIncrement(product)}
                        onClick={()=>this.props.onDecrement(this.props.counter)}
                        className="btn btn-secondary btn-sm m-2"
                        disabled={this.props.counter.value === 0 ? 'disabled' : ''}
                        //className={this.getBadgeClasses()}
                    >
                        -
                    </button>
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={()=>this.props.onDelete(this.props.counter.id)}
                    >
                        x
                    </button>
                </div>
                {/* {this.props.children} */}
                {/* { this.state.tags.length === 0 && "please create a new tag!" }
                { this.renderTags()} */}

                
                
            </div>
          );
    }

    // constructor(){
    //     super();
    //     this.handleIncrement = this.handleIncrement.bind(this);
    // }
    // if the function is not array function, we need to bind this into function, or can not find this property.
    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.props.counter.value === 0 ? "warning" : "primary");
        return classes;
    }
    
    formatCount(){
        const { value } = this.props.counter;
        return value === 0 ? 'Zero' : value; //count === 0 ? <h1> Zero </h1> : count;
    }
}
 
export default Counter;