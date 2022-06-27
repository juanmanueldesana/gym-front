import React from "react";
import './Footer.css'


const Footer = () => {

    let getYear = () => {
        let currentYear = new Date().getFullYear();
        return currentYear;
    };

  return (
    <div>
        <footer>
		<div className="footer-links">

			<div className="container">
				<div id="footer-info" className="row pb-5">
					<div className="col-6 col-md-3 pt-5">
						<h4 style={{ color: '#959595' }}>ACERCA DE</h4>
						<a href="/Faq" style={{ color: '#efefef', textDecoration: 'none' }}>
							<h6 style={{ color: '#efefef' }}>Preguntas frecuentes</h6>
						</a>
						<a href="mailto:desanajm@gmail.com" style={{ color: '#efefef', textDecoration: 'none' }}>
							<h6 style={{ color: '#efefef' }}>Contacto</h6>
						</a>
					</div>

					<div className="col-6 col-md-3 pt-5">
						<h4 style={{ color: '#959595' }}>SECCIONES</h4>

						<a href="/Clases" style={{ color: '#efefef', textDecoration: 'none' }}>
							<h6 style={{ color: '#efefef' }}>Clases</h6>
						</a>
                        <a href="/Staff" style={{ color: '#efefef', textDecoration: 'none' }}>
							<h6 style={{ color: '#efefef' }}>Staff</h6>
						</a>
					</div>
                    <div className="col-6 col-md-3 pt-5">
						<h4 style={{ color: '#959595' }}>SEGUINOS</h4>
						<div className="social">
							<a href="https://www.google.com.ar/" style={{ color: '#efefef', textDecoration: 'none' }}>
								<i id="facebook" style={{ color: '#efefef' }} className="fab fa-facebook-f gray-white pr-2"></i>
								<span style={{ color: '#efefef'}}>Facebook</span>
							</a><br/>
							<a href="https://www.google.com.ar/" style={{ color: '#efefef', textDecoration: 'none' }}>
								<i id="instagram" className="fab fa-instagram gray-white pr-1"></i>
								<span style={{ color: '#efefef' }}>Instagram</span>
							</a><br/>
							<a href="https://www.google.com.ar/" style={{ color: '#efefef', textDecoration: 'none' }}>
								<i id="twitter" className="fab fa-twitter gray-white pr-1"></i>
								<span style={{ color: '#efefef' }}>Twitter</span>
							</a>
						</div>
					</div>    
					<div className="col-6 col-md-3 pt-5">
						<h4 style={{ color: '#959595' }}>COLABORA</h4>
						<a href="https://www.austral.edu.ar/en/" style={{ color: '#efefef', textDecoration: 'none' }}>
							<h6 style={{ color: '#efefef' }}>Universidad Austral</h6>
						</a>
					</div>
					<div style={{ textAlign: "center", marginTop: "25px"}}>
						<h4 style={{ color: '#959595' }}>ENCONTRANOS</h4>
						<a href="https://goo.gl/maps/SE9mzZoANDhop8Xy6" style={{ color: '#efefef', textDecoration: 'none' }}>
							<h6 style={{ color: '#efefef' }}>Bv. Oroño 1554</h6>
						</a>
					</div>
				</div>

			</div>
		</div>
		<div className="footer-end">
			<p>Copyright © {getYear()} Musculito. Todos los derechos reservados.</p>
		</div>
	</footer>
    </div>
  );
};

export default Footer;
