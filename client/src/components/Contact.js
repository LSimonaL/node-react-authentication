import React, { Component } from 'react';
import axios from 'axios';


class Contact extends Component {
    
    handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        axios({
            method: "POST", 
            url:"http://localhost:9090/send", 
            data: {
                name: name, 
                surname: surname,  
                email: email,
                phone: phone,  
                messsage: message
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.")
            }
        })
    }
    
    resetForm(){
        document.getElementById('contact-form').reset();
    }

    render() {
    
    return (
        <div class="container mt-5">
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
            <div class="row">
            <div class="col-md-4 contact-box-1 pt-5">
                <h1>Hi there!</h1>
                <h4>Contact us for more info</h4>
            </div>
            <div class="col-md-8 contact-box-2 pr-5 pl-5">
            <div class="controls text-left">
                     <div class="row pt-5">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Name *</label>
                                <input id="name" type="text" name="name" class="form-control" required="required"></input>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Last name *</label>
                                <input id="surname" type="text" name="surname" class="form-control" required="required"></input>
                            </div>
                        </div>
                        </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Email *</label>
                                <input id="email" type="email" name="email" class="form-control" required="required"></input>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Phone Number *</label>
                                <input id="phone" type="text" name="phone" class="form-control" required="required"></input>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label>Message *</label>
                                <textarea id="message" name="message" class="form-control" rows="4" required="required" ></textarea>
                                <div class="help-block with-errors"></div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <input type="submit" value="send email" class="btn btn-primary btn-send"></input>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </form>
        </div>
    )
    }
}


export default Contact;