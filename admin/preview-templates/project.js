import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Project = createClass({

  render: function () {
    var entry = this.props.entry;
    var image = entry.getIn(['data', 'featured_image']);
    var title = entry.getIn(['data', 'title']);
    var info = entry.getIn(['data', 'info'])
    return html` 
    <main>
      <div class="module project-header">
        <div class="project-overlay">
          <div class="top-header-overlay">
          <img class="project-header-image" src="${image}"/>
          </div>
        </div>
        <h1>${title}</h1>
      </div>
      <div data-scroll="project" class="module dark-mode">
        <div class="horiztonal-flex">
          <div class="left-column ghost"></div>
          <div data-fadein class="left-column project-column">
            <div class="header">${title}</div>
            <div class="tab">
              <div class="tab-content tab-text">
                <p>${info.getIn(['text'])}</p>
              </div>
              <div class="tab-content">
              

              ${info.getIn(["details"], []).map(
      detail =>
        html`
                  <span class="title-detail">${detail.getIn(["header"])}</span>
                  <br/>
                  ${detail.getIn(["text"])}
                  <br/>
                  <br/>
                  `
    )
      }
              </div>

              <div class="tab-content">
                <p>${info.getIn(['testimonial'])}
                </p>
              </div>
              <!--
              <div class="tab-menu">
                <div class="tab-link active-link ">
                  <div class="circle"></div>
                  <div>Text</div>
                </div>
                <div href="#" class="tab-link active-link">
                  <div class="circle"></div>
                  <div>Details</div>
                </div>
                <div href="#" class="tab-link active-link">
                  <div class="circle"></div>
                  <div>Testimonials</div>
                </div>
              </div>
              -->
            </div>
          </div>
          <div class="right-column">
    
            <div data-fadein class="project-content">
              <div class="swiper-container">
                <div class="swiper-wrapper">
                 
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
              </div>
            </div>
            <div data-fadein class="project-content">
            </div>
          </div>
        </div>
      </div>
    </main>
    `;
  }
}
);

export default Project;