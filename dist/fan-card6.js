window.customCards = window.customCards || [];
window.customCards.push({
  type: "fan-card6",
  name: "fan card6",
  description: "A plugin to display your fan controls.",
  preview: false,
});

const LitElement = customElements.get("ha-panel-lovelace") ? Object.getPrototypeOf(customElements.get("ha-panel-lovelace")) : Object.getPrototypeOf(customElements.get("hc-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

class CustomFanCard6 extends LitElement {
  static get properties() {
    return {
      hass: Object,
      _config: Object,
      _stateObj: Object,
      _isOneSpeed: Boolean,
      _isTwoSpeed: Boolean,
      _isThreeSpeed: Boolean,
      _isFourSpeed: Boolean,
      _isFiveSpeed: Boolean,
      _isSixSpeed: Boolean,
      _0CurrentColor: String,
      _1CurrentColor: String,
      _2CurrentColor: String,
      _3CurrentColor: String,
      _4CurrentColor: String,
      _5CurrentColor: String,
      _6CurrentColor: String,
    }
  }

  static get styles() {
    return css`
      :host {
        line-height: inherit;
      }
      .speed {
        min-width: 30px;
        max-width: 30px;
        height: 30px;
        margin-left: 2px;
        margin-right: 2px;
        background-color: #759aaa;
        border: 1px solid lightgrey;
        border-radius: 4px;
        font-size: 10px !important;
        color: inherit;
        text-align: center;
        float: right !important;
        padding: 1px;
        cursor: pointer;
      }
    `;
  }

  render() {
    return html`
      <hui-generic-entity-row .hass="${this.hass}" .config="{this._config}">
        <div id='button-container' class='horizontal justified layout'>
          <button
            class='speed'
            style='${this._0CurrentColor}'
            toggles name="0"
            @click=${this.setPercentage}
            <span>Off</span>
          </button>
          <button
            class='speed'
            style='${this._1CurrentColor}'
            toggles name="16"
            @click=${this.setPercentage}
            .disabled=${this._isOneSpeed}>
            <span>1</span>
          </button>
          <button
            class='speed'
            style='${this._2CurrentColor}'
            toggles name="33"
            @click=${this.setPercentage}
            .disabled=${this._isTwoSpeed}>
            <span>2</span>
          </button>
          <button
            class='speed'
            style='${this._3CurrentColor}'
            toggles name="50"
            @click=${this.setPercentage}
            .disabled=${this._isThreeSpeed}>
            <span>3</span>
          </button>
          <button
            class='speed'
            style='${this._4CurrentColor}'
            toggles name="66"
            @click=${this.setPercentage}
            .disabled=${this._isFourSpeed}>
            <span>4</span>
          </button>
          <button
            class='speed'
            style='${this._5CurrentColor}'
            toggles name="83"
            @click=${this.setPercentage}
            .disabled=${this._isFiveSpeed}>
            <span>5</span>
          </button>
          <button
            class='speed'
            style='${this._6CurrentColor}'
            toggles name="100"
            @click=${this.setPercentage}
            .disabled=${this._isSixSpeed}>
            <span>6</span>
          </button>
        </div>
      </hui-generic-entity-row>
    `;
  }

  setConfig(config) {
    this._config = {
      ...this._config,
      customTheme: false,
      customOffActiveColor: '#a33236',
      customSpeedActiveColor: '#458D02',
      customButtonOffColor: '#999999',
      ...config
    };
  }

  firstUpdated() {
    super.firstUpdated();
    this.shadowRoot.getElementById('button-container').addEventListener('click', (ev) => ev.stopPropagation());
  }

  updated(props) {
    if (props.has("hass")) {
      this.hassChanged();
    }
  }

  hassChanged() {
    const config = this._config;
    const stateObj = this.hass.states[config.entity];
    const custTheme = config.customTheme;

    let percentage;
    if (stateObj && stateObj.attributes) {
      percentage = stateObj.attributes.percentage || '0';
    }

    let N0CurrentColor;
    let N1CurrentColor;
    let N2CurrentColor;
    let N3CurrentColor;
    let N4CurrentColor;
    let N5CurrentColor;
    let N6CurrentColor;

    if (custTheme) {
      N0CurrentColor = 'background-color:' + ((percentage == '0') ? config.customOffActiveColor : config.customButtonOffColor);
      N1CurrentColor = 'background-color:' + ((percentage == '16') ? config.customSpeedActiveColor : config.customButtonOffColor);
      N2CurrentColor = 'background-color:' + ((percentage == '33') ? config.customSpeedActiveColor : config.customButtonOffColor);
      N3CurrentColor = 'background-color:' + ((percentage == '50') ? config.customSpeedActiveColor : config.customButtonOffColor);
      N4CurrentColor = 'background-color:' + ((percentage == '66') ? config.customSpeedActiveColor : config.customButtonOffColor);
      N5CurrentColor = 'background-color:' + ((percentage == '83') ? config.customSpeedActiveColor : config.customButtonOffColor);
      N6CurrentColor = 'background-color:' + ((percentage == '100') ? config.customSpeedActiveColor : config.customButtonOffColor);
    } else {
      N0CurrentColor = 'background-color:' + ((percentage == '0') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
      N1CurrentColor = 'background-color:' + ((percentage == '16') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
      N2CurrentColor = 'background-color:' + ((percentage == '33') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
      N3CurrentColor = 'background-color:' + ((percentage == '50') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
      N4CurrentColor = 'background-color:' + ((percentage == '66') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
      N5CurrentColor = 'background-color:' + ((percentage == '83') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
      N6CurrentColor = 'background-color:' + ((percentage == '100') ? 'var(--primary-color)' : 'var(--disabled-text-color)');
    }

    this._stateObj = stateObj;
    this._isOneSpeed = (percentage === '16' && stateObj.state === 'on');
    this._isTwoSpeed = (percentage === '33' && stateObj.state === 'on');
    this._isThreeSpeed = (percentage === '50' && stateObj.state === 'on');
    this._isFourSpeed = (percentage === '66' && stateObj.state === 'on');
    this._isFiveSpeed = (percentage === '83' && stateObj.state === 'on');
    this._isSixSpeed = (percentage === '100' && stateObj.state === 'on');
    this._0CurrentColor = N0CurrentColor;
    this._1CurrentColor = N1CurrentColor;
    this._2CurrentColor = N2CurrentColor;
    this._3CurrentColor = N3CurrentColor;
    this._4CurrentColor = N4CurrentColor;
    this._5CurrentColor = N5CurrentColor;
    this._6CurrentColor = N6CurrentColor;
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  setPercentage(e) {
    const percentage = e.currentTarget.getAttribute('name');
    const param = { entity_id: this._config.entity, percentage: percentage };

    this.hass.callService('fan', 'set_percentage', param);
  }
}

customElements.define('fan-card6', CustomFanCard6);
