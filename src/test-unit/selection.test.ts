import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { findAdjacentTopLevelForms } from '../finders';

describe('F# Helpers Unit Test Suite', () => {

	it("Single statement range selection", function() {
		let text = "let testValue = 155";
		let pos = 5;
		let result = findAdjacentTopLevelForms(text, pos);
		assert.equal(0, result?.current);
		assert.equal(19, result?.next);
	  });

	  it("Multiple statements selection", function() {
		let text = "let x = 1\nlet y = 2\nlet z = 3";
		let pos = text.indexOf('y')
		let result = findAdjacentTopLevelForms(text, pos);
		assert.equal(0, result?.previous);
		assert.equal(10, result?.current);
		assert.equal(20, result?.next);
	  });

	  it("Multiple various statements selection", function() {
		let text = "let x = 1\ntype Test = \n  { Ok: bool }\nlet z = 3";
		let pos = text.indexOf('T')
		let result = findAdjacentTopLevelForms(text, pos);
		assert.equal(0, result?.previous);
		assert.equal(10, result?.current);
		assert.equal(38, result?.next);
	  });

	  it("Complex statement selection", function() {
		let text = "let x = 1\nlet y (a,b,c) =\n  c\n  |> Seq.map (fun i -> i + b / c)\nlet z = 3";
		let pos = text.indexOf('S')
		let result = findAdjacentTopLevelForms(text, pos);
		assert.equal(0, result?.previous);
		assert.equal(10, result?.current);
		assert.equal(64, result?.next);
	  });
});
