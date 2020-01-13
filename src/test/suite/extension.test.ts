import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { findTopLevelFormBounds } from '../../finders';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test("Simple range selection", function() {
		let text = "let testValue = 155";
		let pos = 5;
		let result = findTopLevelFormBounds(text, pos);
		assert.equal(0, result?.start);
		assert.equal(19, result?.end);
	  });
});
