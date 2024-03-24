import React, { Component } from "react";


export const Footer = () => (
	<footer className="mt-5" style={{backgroundColor: '#f8f9fa', color: '#212529', padding: '20px', textAlign: 'center'}}>
            <div>
                <img src="" alt="" style={{maxWidth: '200px'}}/>
            </div>
            <div style={{marginTop: '20px'}}>
                <a href="#" style={{color: '#212529', textDecoration: 'none', marginRight: '15px'}}>Facebook</a>
                <a href="#" style={{color: '#212529', textDecoration: 'none', marginRight: '15px'}}>Twitter</a>
                <a href="#" style={{color: '#212529', textDecoration: 'none', marginRight: '15px'}}>Instagram</a>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <div style={{marginRight: '50px'}}>
                    <h4>BeatBooK</h4>
                    <p>Home</p>
                    <p>Signup</p>
                </div>
            </div>
        </footer>
);
