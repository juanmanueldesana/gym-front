import React from "react";

const Carousel = () => {
  return (
    <div>
      <div
        id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img style={{ height: '50vh' }} src="/images/slider/1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img style={{ height: '50vh' }} src="/images/slider/2.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img style={{ height: '50vh' }} src="/images/slider/3.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
