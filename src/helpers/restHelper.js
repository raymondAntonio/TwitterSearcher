/**
 * Created by raymond on 21/07/15.
 */
"use strict";
module.exports = {
    get: function(url) {
        return new Promise(function (success, error) {
            $.ajax({
                type: "GET",
                ifModified: true,
                url: url,
                dataType: "json",
                success: success,
                error: error
            });

        });

    }
};

