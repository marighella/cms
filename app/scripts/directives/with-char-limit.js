
var directive = function($compile){
  return {
    restrict: "A",
    scope: { },
    link: function(scope, el){
      function getMessage (){
        var limit = parseInt(el.attr("maxlength"));
        var current = el.val().length;
        var counter = (current - limit) * -1;

        var messages = {
          singular: "$ caracter restante",
          plural: "$ caracteres restantes",
          none: "Você atingiu o limite de caracteres"
        };

        switch(counter) {
          case 0:
            return {
            message: messages.none,
            style: "warnning"
          }
          case 1:
            return {
            message: messages.singular.replace("$", counter),
            style: "warnning"
          };
          default:
            return {
            message: messages.plural.replace("$", counter),
            style: ""
          }
        }
      }
      function createElement(){
        var messageEL = angular.element('<p class="{{ view.style }}">{{ view.message }}</p>');
        messageEL.insertAfter(el);
        $compile(messageEL)(scope);
      }
      el.on("keyup keydown keypress", function(){
        scope.message = getMessage();
        scope.$digest();
      });

      createElement();
      scope.view = getMessage();
    }
  }

};

app.directive('withCharCounter', directive);
