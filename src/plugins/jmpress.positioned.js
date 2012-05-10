/*!
 * jmpress.positioned plugin
 * For positioning elements without attaching them to a step. This can be used for elements that belong to more than one slide, e.g. graphs or arrows
 * 
 * Usage:
 * 1. Define elements inside your jmpress presentation.
 * 2. Mark them in such a way that settings.positionedElementSelector finds them.
 * 3. Use any data-annotations as you would use with a step element.
 */

(function($, document, window, undefined) {

    $.jmpress("defaults").positionedElementSelector = '.positioned';

    $.jmpress("afterInit", function(step, eventData) {

        var positionedElements = $(eventData.settings.positionedElementSelector, eventData.jmpress);

        positionedElements.each(function(index, element) {

            // prepare data for transformation
	    var data = $.jmpress("dataset", element);
	    var step = {
		oldStyle: $(element).attr("style") || ""
	    };

	    var callbackData = {
		data: data
		,stepData: step
	    };

            // set transform using data from above (we re-use the regular setup mechanism)
            // --> we need to check if this interferes with any other plugins
	    eventData.callCallback("beforeInitStep", $(element), callbackData);
            eventData.callCallback('initStep', $(element), callbackData);
	    $(element).data('stepData', step);
	    eventData.callCallback('applyStep', $(element), callbackData);

            // add the element to the canvas because it was not added by the regular mechanism. Leaving it out would mean that we _only_ scale it, which looks silly.
            eventData.canvas.append(element);
        });
        
    });


}(jQuery, document, window));