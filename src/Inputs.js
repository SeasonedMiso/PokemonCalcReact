//implment atk stages, accuracy stages

import React from "react";
class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lvl: 50,
      パワー: 50,
      攻: 50,
      防: 50,
      value: "1x",
      damage: "",
      lowRoll: 0,
      highRollCrit: 0,
      STAB: false,
    };
    this.calc = this.calc.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  calc(e) {
    let stabMod = 1;
    if (this.state.STAB) {
      stabMod = 1.5;
    }
    let baseDmg = Math.floor(
      Math.floor(
        (Math.floor((2 * this.state.Lvl) / 5 + 2) *
          this.state.攻 *
          this.state.パワー) /
          this.state.防
      ) / 50
    );
    console.log(baseDmg);
    // let dmgMult1Base = burn * screen * targets * weather * ff;
    let dmgMult1 = 1;
    // let dmgMult2 =
    //   item * first * stab * type1 * type2 * srf * eb * tl * berry;
    let dmgMult2 = stabMod;
    let dmgTotHigh = (baseDmg * dmgMult1 + 2) * dmgMult2;
    let dmgTotLow = dmgTotHigh * 0.85;
    let dmgTotLowCrit = dmgTotLow * 2;
    let dmgTotHighCrit = dmgTotHigh * 2;

    e.preventDefault();
    this.setState({
      damage:
        Math.floor(dmgTotLow) +
        " - " +
        Math.floor(dmgTotHigh) +
        "  (" +
        Math.floor(dmgTotLowCrit) +
        " - " +
        Math.floor(dmgTotHighCrit) +
        ")",
    });

    // this.setState({
    //   lowRoll: (parseInt(this.state.damage) * 85) / 100,
    //   highRollCrit: parseInt(this.state.damage) * 2,
    // });
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <div>
        <form>
          <label>
            Lvl
            <input
              name="Lvl"
              type="number"
              value={this.state.Lvl}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            パワー
            <input
              name="パワー"
              type="number"
              value={this.state.パワー}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            攻
            <input
              name="攻"
              type="number"
              value={this.state.攻}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <label>
            防(敵)
            <input
              name="防"
              type="number"
              value={this.state.防}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          {/* <label>
            <select>
              <option value=">0.25x">0.25x</option>
              <option value=">0.5x">0.5x</option>
              <option selected value=">1x">
                1x
              </option>
              <option value="2x">2x</option>
              <option value="4x">4x</option>
            </select>
          </label> */}
          STAB
          <input
            name="STAB"
            type="checkbox"
            checked={this.state.STAB}
            onChange={this.handleInputChange}
          />
          <br />
          <button
            type="simpleQuery"
            onClick={(e) => {
              this.calc(e);
            }}
          >
            Calc
          </button>
          <input type="text" className="outStyle" value={this.state.damage} />
        </form>
      </div>
    );
  }
}
export default Inputs;
