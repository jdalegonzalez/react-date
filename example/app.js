'use strict';

var React = require('react');
var parse = require('dehumanize-date');
var format = require('occasion');
var DateInput = React.createFactory(require('../'));

var div = React.createFactory('div');
var h1 = React.createFactory('h1');
var p = React.createFactory('p');
var pre = React.createFactory('pre');
var code = React.createFactory('code');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      date: '2014-01-23'
    };
  },
  render: function () {
    return div({},
      h1({}, 'Using "defaultValue"'),
      p({}, 'This creates an editable input, as you would expect. ' +
                      'Note that it will not respond to changes in the model though.'),
      DateInput({
        className: ['form-control'],
        format: 'DD/MM/YYYY',
        defaultValue: this.state.date
      }),
      h1({}, 'Using "value" and no "onChange"'),
      p({}, 'This creates a read only input that responds to changes.'),
      DateInput({
        className: ['form-control'],
        format: 'DD-MM-YYYY',
        value: this.state.date,
        readOnly: true
      }),
      h1({}, 'Using "value" with "onChange"'),
      p({}, 'This creates a typical, input, you can edit it and when the input "blurs" it will revert to the auto-formatted date.'),
      DateInput({
        className: ['form-control'],
        format: 'DD/MM/YYYY',
        value: this.state.date,
        onChange: function (e) {
          this.setState({date: e.target.value});
        }.bind(this)
      }),
      h1({}, 'Using valueLink'),
      p({}, 'This is exactly the same as using "value" with "onChange".'),
      DateInput({
        className: ['form-control'],
        format: function (value) {
          return value === parse('today') ? 'today' : format(value, 'DD-MM-YYYY');
        },
        valueLink: {
          value: this.state.date,
          requestChange: function (v) { this.setState({date: v}); }.bind(this)
        }
      }),
      h1({}, 'Just a pre/code'),
      p({}, 'Just so you can see the output.'),
      pre({}, code({},  this.state.date))
    );
  }
});
