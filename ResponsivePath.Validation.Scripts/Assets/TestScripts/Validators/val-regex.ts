﻿module ResponsivePath.Validation.Unobtrusive.Tests {
	describe('Unit: Directive val-regex', function () {
		beforeEach(module('unobtrusive.validation', 'ngMock'));

		var compile: angular.ICompileService;
		var rootScope: angular.IRootScopeService;
		var validation: ValidationService;
		var sce: angular.ISCEService;

		beforeEach(inject(($compile: angular.ICompileService, $rootScope: angular.IRootScopeService, _validation_: ValidationService, $sce: angular.ISCEService) => {
			compile = $compile;
			rootScope = $rootScope;
			validation = _validation_;
			sce = $sce;
		}));

        var scope: ng.IScope;
		var fieldName: string = 'Target';
		var message: string = 'Invalid';
		var element: angular.IAugmentedJQuery;

		beforeEach(() => {
			scope = rootScope.$new();

			element = compile('<form><input type="text" data-val="true" name="Target" ng-model="target" data-val-regex="Invalid" data-val-regex-pattern="^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$" /></form>')(scope);
            element = element.find('input');
		});

        function isValid() {
            expect((<ng.INgModelController>element.controller('ngModel')).$invalid).to.be(false);
        }

        function isInvalid() {
            expect((<ng.INgModelController>element.controller('ngModel')).$invalid).to.be(true);
        }

		it('passes a null value',() => {
			scope['target'] = null;
			scope.$digest();

			isValid();
		});

		it('passes an empty value',() => {
			scope['target'] = '';
			scope.$digest();

			isValid();
		});

		it('fails an incorrect value',() => {
			scope['target'] = '0';
			scope.$digest();

			isInvalid();
		});

		it('passes a correct value',() => {
			scope['target'] = '00000000-0000-0000-0000-000000000000';
			scope.$digest();

			isValid();
		});

	});
}