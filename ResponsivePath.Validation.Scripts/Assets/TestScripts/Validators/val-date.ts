﻿module ResponsivePath.Validation.Unobtrusive.Tests {
	describe('Unit: Directive val-date', function () {
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

			element = compile('<form><input type="text" data-val="true" name="Target" ng-model="target" data-val-date="Invalid" /></form>')(scope);
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

		// the date validation really isn't very good, but we're basing it on the jquery unobtrusive validation logic. You should probably add a regex to it...

		var failed = ["--", "never"];
		_.each(failed,(badValue) => {
			it('fails "' + badValue+'"',() => {
				scope['target'] = badValue;
				scope.$digest();

				isInvalid();
			});
		});

		var passes = ["2011-01-01", "01/01/1980"];
		_.each(passes,(goodValue) => {
			it('passes "' + goodValue + '"',() => {
				scope['target'] = goodValue;
				scope.$digest();

				isValid();
			});
		});

	});
}