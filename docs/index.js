$(function () {
	// init layout
	$('#main_layout').w2layout({
		name: 'layout',
		panels: [
			{ type: 'left', size: 240, resizable: true, style: 'border-right: 1px solid silver;' },
			{ type: 'main', style: 'background-color: white;' }
		]
	});
	// init sidebar
	w2ui['layout'].content('left', $().w2sidebar({
		name: 'docs',
		img: null,
		nodes: [
			{ id: 'w2layout', text: 'w2layout', img: 'icon-folder', group1: true, expanded: true, nodes: [
				{ id: 'w2layout-events', text: 'Events', icon: 'fa-tag' },
				{ id: 'w2layout-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2layout-methods', text: 'Methods', icon: 'fa-cog' }
			]},
			{ id: 'w2grid', text: 'w2grid', img: 'icon-folder', group1: true, expanded1: true, nodes: [
				{ id: 'w2grid-events', text: 'Events', icon: 'fa-tag' },
				{ id: 'w2grid-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2grid-methods', text: 'Methods', icon: 'fa-cog' }
			] },
			{ id: 'w2toolbar', text: 'w2toolbar', img: 'icon-folder', group1: true, expanded1: true, nodes: [
				{ id: 'w2toolbar-events', text: 'Events', icon: 'fa-tag' },
				{ id: 'w2toolbar-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2toolbar-methods', text: 'Methods', icon: 'fa-cog' }
			] },
			{ id: 'w2sidebar', text: 'w2sidebar', img: 'icon-folder', group1: true, expanded1: true, nodes: [
				{ id: 'w2sidebar-events', text: 'Events', icon: 'fa-tag' },
				{ id: 'w2sidebar-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2sidebar-methods', text: 'Methods', icon: 'fa-cog' }
			] },
			{ id: 'w2tabs', text: 'w2tabs', img: 'icon-folder', group1: true, expanded1: true, nodes: [
				{ id: 'w2tabs-events', text: 'Events', icon: 'fa-tag' },
				{ id: 'w2tabs-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2tabs-methods', text: 'Methods', icon: 'fa-cog' }
			] },
			{ id: 'w2form', text: 'w2form', img: 'icon-folder', group1: true, expanded1: true , nodes: [
				{ id: 'w2form-events', text: 'Events', icon: 'fa-tag' },
				{ id: 'w2form-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2form-methods', text: 'Methods', icon: 'fa-cog' }
			]},
			{ id: 'w2popup', text: 'w2popup', img: 'icon-folder', group1: true, expanded1: true, nodes: [
				{ id: 'w2popup-methods', text: 'Methods', icon: 'fa-cog', 
					nodes: [
						{ id: 'w2popup.clear', text: 'clear', icon: 'fa-cog' },
						{ id: 'w2popup.close', text: 'close', icon: 'fa-cog' },
						{ id: 'w2popup.get', text: 'get', icon: 'fa-cog' },
						{ id: 'w2popup.load', text: 'load', icon: 'fa-cog' },
						{ id: 'w2popup.max', text: 'max', icon: 'fa-cog' },
						{ id: 'w2popup.message', text: 'message', icon: 'fa-cog' },
						{ id: 'w2popup.min', text: 'min', icon: 'fa-cog' },
						{ id: 'w2popup.open', text: 'open', icon: 'fa-cog' },
						{ id: 'w2popup.reset', text: 'reset', icon: 'fa-cog' },
						{ id: 'w2popup.set', text: 'set', icon: 'fa-cog' },
						{ id: 'w2popup.toggle', text: 'toggle', icon: 'fa-cog' }
					]
				}
			] },
			{ id: 'w2utils', text: 'w2utils', img: 'icon-folder', group1: true, expanded1: true, nodes: [
				{ id: 'w2utils-props', text: 'Properties', icon: 'fa-star-empty' },
				{ id: 'w2utils-methods', text: 'Methods', icon: 'fa-cog' }
			] }
		],
		onClick: function(id, data) {
			doClick(id, data);
			window.skipChange = true;
			document.location = '#' + id;
		}
	}));

	// create test objects
	$().w2layout({ name: 'test-layout' });
	$().w2grid({ name: 'test-grid' });
	$().w2sidebar({ name: 'test-sidebar' });
	$().w2toolbar({ name: 'test-toolbar' });
	$().w2tabs({ name: 'test-tabs' });
	$().w2form({ name: 'test-form' });

	// init properties and methods
	init('layout');
	init('grid');
	init('sidebar');
	init('toolbar');
	init('tabs');
	init('form');

	// utils
	var methods = [];
	for (var o in w2utils) { if (o == 'settings') continue; methods.push(o); }
	methods.sort();
	var nodes = []
	for (var o in methods) nodes.push({ id: 'w2utils.' + methods[o], text: methods[o], icon: 'fa-cog' });
	w2ui['docs'].add('w2utils-methods', nodes);
	w2ui['docs'].add('w2utils-props', { id: 'w2utils.settings', text: 'settings', icon: 'fa-star-empty' });

	// remove internal methods/props
	w2ui['docs'].remove('w2layout.panel', 'w2grid.isIOS', 'w2toolbar.item', 'w2sidebar.node', 'w2tabs.tab');

	function init (type) {
		var methods = [];
		var props   = [];
		for (var o in w2obj[type].prototype) methods.push(o);
		for (var o in w2ui['test-'+ type]) props.push(o);
		methods.sort();
		props.sort();
		var nodes = []
		for (var o in methods) {
			//console.log('---' + methods[o]);
			nodes.push({ id: 'w2'+ type +'.' + methods[o], text: methods[o], icon: 'fa-cog' });
		}
		w2ui['docs'].add('w2'+ type +'-methods', nodes);
		var nodes1 = [];
		var nodes2 = [];
		for (var o in props) {
			//console.log('--->' + props[o]);
			if (w2ui['docs'].get('w2'+ type +'.' + props[o]) != null) continue;
			if (props[o].substr(0, 2) == 'on') {
				nodes1.push({ id: 'w2'+ type +'.' + props[o], text: props[o], icon: 'fa-tag' });
			} else {
				nodes2.push({ id: 'w2'+ type +'.' + props[o], text: props[o], icon: 'fa-star-empty' });
			}
		}
		w2ui['docs'].add('w2'+ type +'-events', nodes1);
		w2ui['docs'].add('w2'+ type +'-props', nodes2);
	}

	// show latest hash
	function goHash() {
		if (window.skipChange === true) {
			window.skipChange = false;
			return;
		}
		var hash = String(document.location.hash).substr(1);
		if (w2ui['docs'].get(hash) != null) {
			doClick(hash);
			w2ui['docs'].collapseAll();
			w2ui['docs'].select(hash);
			w2ui['docs'].expandParents(hash);
		}
	}
	$(window).on('hashchange', goHash);
	goHash();
});

function doClick (cmd, data) {
	if (cmd.indexOf('.') == -1) return;
	var tmp = cmd.split('.');
	switch(tmp[1]) {
		case 'box'		: cmd = 'common.box'; break;
		case 'name'		: cmd = 'common.name'; break;
		case 'handlers'	: cmd = 'common.handlers'; break;
		case 'style'	: cmd = 'common.style'; break;
		case 'render'	: cmd = 'common.render'; break;
		case 'refresh'	: cmd = 'common.refresh'; break;
		case 'destroy'	: cmd = 'common.destroy'; break;
		case 'resize'	: cmd = 'common.resize'; break;
		case 'on'		: cmd = 'common.on'; break;
		case 'off'		: cmd = 'common.off'; break;
		case 'trigger'	: cmd = 'common.trigger'; break;
		case 'onRender'	: cmd = 'common.onRender'; break;
		case 'onRefresh': cmd = 'common.onRefresh'; break;
		case 'onDestroy': cmd = 'common.onDestroy'; break;
		case 'onResize'	: cmd = 'common.onResize'; break;
	}
	w2ui['layout'].content('main', '');
	$.get('details/'+ cmd +'.html', function (data) {
		data = data.replace(/href="/g, 'href="#');
		w2ui['layout'].content('main', 
			'<div class="obj-desc">'+ 
			'<h1>' + cmd + '</h1>' +
			data + 
			'</div>');
		// javascript
		$("textarea.javascript").each(function (index, el) {
			var obj = this;
			// resize to context
			var ta = $(this);
			$(ta).height(ta.scrollHeight + 2);
			// init Code Mirror
			var codeMirror = CodeMirror(
				function (elt) {
			  		obj.parentNode.replaceChild(elt, obj);
				}, {
					value		: $.trim($(obj).val()),
					mode		: "javascript",
					readOnly	: true,
					gutter		: true,
					lineNumbers	: true
				}
			);
		});
		// html
		$("textarea.html").each(function (index, el) {
			var obj = this;
			// resize to context
			var ta = $(this);
			$(ta).height(ta.scrollHeight + 2);
			// init Code Mirror
			var codeMirror = CodeMirror(
				function (elt) {
			  		obj.parentNode.replaceChild(elt, obj);
				}, {
					value		: $.trim($(obj).val()),
					mode		: "xml",
					readOnly	: true,
					gutter		: true,
					lineNumbers	: true
				}
			);
		});
	});
}