this["Animasong"] = this["Animasong"] || {};
this["Animasong"]["Templates"] = this["Animasong"]["Templates"] || {};

this["Animasong"]["Templates"]["assets/templates/player.hbs"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "<div class=\"animasong cf\" style=\"width:"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.width : stack1), depth0))
    + "px; height:"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.player : depth0)) != null ? stack1.height : stack1), depth0))
    + "px\">\n    <div class=\"animasong-networks\">\n        <a target=\"_blank\" href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.song : depth0)) != null ? stack1.location : stack1), depth0))
    + "\">\n            <i class=\"animasong-icon-soundcloud\"></i>\n        </a>\n        <a target=\"_blank\" href=\"http://animasong.com\">\n            <i class=\"animasong-icon-info\"></i>\n        </a>\n    </div>\n    <canvas id=\""
    + escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"animasong-canvas\"></canvas>\n    <div class=\"animasong-bar cf\">\n        <div class=\"animasong-bar-left\">\n            <div class=\"animasong-bar-play\">\n                <i></i>\n                <hr class=\"animasong-bar-separator\"/>\n            </div>\n            <div class=\"animasong-bar-volume cf\">\n                <div class=\"animasong-bar-volume-slider\">\n                    <div class=\"animasong-bar-volume-slider-current\"></div>\n                </div>\n                <i class=\"animasong-icon-volume\"></i>\n            </div>\n        </div>\n        <div class=\"animasong-bar-song-name\">\n        </div>\n    </div>\n</div>";
},"useData":true});