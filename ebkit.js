
jQuery(document).ready(function($) {
    var averageScore;
    var the_persentage;

    function loadReviews(index){
      $('.reviews-popup').addClass('loading');
      var the_limit = 3 + index;
      for (var i = index; i < reviews.length; i++) {
        var thePersentage = reviews[i].score / 5 * 100 + '%';
        var template = '<li class="reviews-list__item">'
        + '<div class="reviews-list__header"><span class="reviews-list__star_wrap"><span class="reviews-list__star_inner" style="width:'+thePersentage+'"></span></span> <strong class="reviews-list__title">'+reviews[i].title+'</strong></div>'
        + '<div class="reviews-list__meta">By<span class="reviews-list__name">  '+reviews[i].name+'  </span>, On <span class="reviews-list__date">' +reviews[i].date+'</span></div>'
        + '<div class="reviews-list__content">'+reviews[i].comment+'</div>'
        +' </li>'
        $('.jsReviewList').append(template)
        $('.reviews-popup').removeClass('loading');
        if (i == the_limit) {
          break;
        }
      }
      if (i == reviews.length) {
        $('.reviews-popup').removeClass('loading');
        $('.jsLoadMore').html('No more reviews to load').attr('disabled', true);      
      }
    }

    function getAverage(reviews) {
      var sum = 0,
      average = 0,
      lowScores = 0,
      midScores = 0,
      highScores = 0;

      if(!Array.isArray(reviews)) { 
        return;
      }

      for(var i = 0; i < reviews.length; i++) {
        var that = reviews[i];
        if(that.score) {
          sum += that.score;
          if(that.score >= 4) {
            highScores++;
          }
          else if(that.score > 2.5 && that.score < 4) {
            midScores++;
          }
          else {
            lowScores++;
          }
        }
      }

      average = sum / reviews.length;
      average = average.toFixed(1);
      the_p = average / 5 * 100;
      

      localStorage.setItem("averageScore", average);
      localStorage.setItem("persentage", the_p);
      localStorage.setItem("dataLength", reviews.length);
      return average;
    }

    function checkForUpdate(length) {
      console.log(length)
      if(length !== localStorage.getItem("dataLength")) {
          averageScore = getAverage(reviews);
          the_persentage =  getAverage(reviews) / 5 * 100;
        }
        else {
          averageScore = localStorage.getItem("averageScore");
          the_persentage = localStorage.getItem("persentage");
          console.log('we take it from local storage')
        }
    }

    function init() {
      // set or get length here
      var length = reviews.length.toString()

      checkForUpdate(length);
      $('.jsAverage').html(averageScore);
      var the_p = the_persentage + '%'
      $('.jsStar span').css('width', the_p);
      console.log(the_persentage);
    }

  //window.onload = init;
  init();


  $('.jsLoadMore').click(function(event) {
    event.preventDefault();
    var index = $('.jsReviewList li').last().index();
    console.log(index)
    loadReviews(index)
  });


  $('.jsReviewWidget').click(function(event) {
    event.preventDefault();
    loadReviews(0)
    $('.jsReviewsPopup, .jsReviewOverlay').fadeIn();
    $('body').css('overflow', 'hidden');
  });

  $('.jsReviewOverlay, .jsReviewClose').click(function(event) {
    event.preventDefault();
    $('body').css('overflow', 'visible');
    $('.jsReviewsPopup, .jsReviewOverlay').fadeOut();
  });


});
  
