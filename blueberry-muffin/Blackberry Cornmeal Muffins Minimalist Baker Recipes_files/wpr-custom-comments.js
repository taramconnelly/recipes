jQuery(document).ready(function () {
    if(jQuery(".comment-list").length) {
        jQuery('.comment-list > li:visible:first').addClass('wpr-border-top');
    }

    if(jQuery(".comment-form-subscriptions").length) {
        jQuery(".comment-form-subscriptions").insertAfter(".form-submit");
    }

    if(jQuery(".comment-form-wpr-list").length) {
        jQuery(".comment-form-wpr-list").insertBefore(".form-submit");
    }

    if(jQuery('span.comment-notes:contains("subscriptions")').length) {
        jQuery('span.comment-notes:contains("subscriptions")').each(function () {
		    jQuery('span.comment-notes:contains("subscriptions")').insertAfter(".form-submit");
		});
    }
    

    jQuery(".wpr-comment-filters a").on("click", function (e) {
        e.preventDefault();
        jQuery(this).siblings().removeClass("wpr-active-tab");
        jQuery(this).addClass("wpr-active-tab");
        var wprElement = jQuery(this).attr("id");

        if (jQuery(".comment-list").length) {
            if (wprElement == 'wpr_display_all') {
                jQuery(".comment-list li").siblings().show();
                jQuery('.comment-list > li').removeClass('wpr-border-top');
                jQuery('.comment-list > li:visible:first').addClass('wpr-border-top');
            } else {
                jQuery(".comment-list li").siblings().hide();
                jQuery(".comment-list li." + wprElement).show();
                jQuery('.comment-list > li').removeClass('wpr-border-top');
                jQuery('.comment-list > li:visible:first').addClass('wpr-border-top');
            }
        }

    });
});