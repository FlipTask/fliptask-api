import React, {Component} from 'react';
import CKEditor from "@ckeditor/ckeditor5-react"; 
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor"; 
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials"; 
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold"; 
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic"; 
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline"; 
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough"; 
import Mention from "@ckeditor/ckeditor5-mention/src/mention"; 
import Link from "@ckeditor/ckeditor5-link/src/link"; 
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import BalloonToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/balloon/balloontoolbar";

function MentionLinks(editor) {
    // The upcast converter will convert <a class="mention" href="" data-user-id="">
    // elements to the model 'mention' attribute.
    editor.conversion.for ('upcast') .elementToAttribute({
            view: {
                name: 'a',
                key: 'data-mention',
                classes: 'mention',
                attributes: {
                    href: true,
                    'data-user-id': true
                }
            },
            model: {
                key: 'mention',
                value: viewItem => {
                    // The mention feature expects that the mention attribute value in the model is
                    // a plain object with a set of additional attributes. In order to create a
                    // proper object, use the toMentionAttribute helper method:
                    const mentionAttribute = editor
                        .plugins
                        .get('Mention')
                        .toMentionAttribute(viewItem, {
                            // Add any other properties that you need.
                            link: viewItem.getAttribute('href'),
                            userId: viewItem.getAttribute('data-user-id')
                        });

                    return mentionAttribute;
                }
            },
            converterPriority: 'high'
        });
    
    // Downcast the model 'mention' text attribute to a view <a> element.
    editor.conversion.for ('downcast') .attributeToElement({
            model: 'mention',
            view: (modelAttributeValue, viewWriter) => {
                // Do not convert empty attributes (lack of value means no mention).
                if (!modelAttributeValue) {
                    return;
                }

                return viewWriter.createAttributeElement('a', {
                    class: 'mention',
                    'data-mention': modelAttributeValue.id,
                    'data-user-id': modelAttributeValue.userId,
                    'href': modelAttributeValue.link
                });
            },
            converterPriority: 'high'
        });
    }

const items = [
    {
        marker: '@',
        feed: [
            {
                id: '@cflores',
                avatar: '1',
                name: 'Charles Flores'
            }, {
                id: '@gjackson',
                avatar: '2',
                name: 'Gerald Jackson'
            }, {
                id: '@wreed',
                avatar: '3',
                name: 'Wayne Reed'
            }, {
                id: '@lgarcia',
                avatar: '4',
                name: 'Louis Garcia'
            }, {
                id: '@rwilson',
                avatar: '5',
                name: 'Roy Wilson'
            }, {
                id: '@mnelson',
                avatar: '6',
                name: 'Matthew Nelson'
            }, {
                id: '@rwilliams',
                avatar: '7',
                name: 'Randy Williams'
            }, {
                id: '@ajohnson',
                avatar: '8',
                name: 'Albert Johnson'
            }, {
                id: '@sroberts',
                avatar: '9',
                name: 'Steve Roberts'
            }, {
                id: '@kevans',
                avatar: '10',
                name: 'Kevin Evans'
            }, {
                id: '@mwilson',
                avatar: '1',
                name: 'Mildred Wilson'
            }, {
                id: '@mnelson',
                avatar: '2',
                name: 'Melissa Nelson'
            }, {
                id: '@kallen',
                avatar: '3',
                name: 'Kathleen Allen'
            }, {
                id: '@myoung',
                avatar: '4',
                name: 'Mary Young'
            }, {
                id: '@arogers',
                avatar: '5',
                name: 'Ashley Rogers'
            }, {
                id: '@dgriffin',
                avatar: '6',
                name: 'Debra Griffin'
            }, {
                id: '@dwilliams',
                avatar: '7',
                name: 'Denise Williams'
            }, {
                id: '@ajames',
                avatar: '8',
                name: 'Amy James'
            }, {
                id: '@randerson',
                avatar: '9',
                name: 'Ruby Anderson'
            }, {
                id: '@wlee',
                avatar: '10',
                name: 'Wanda Lee'
            }
        ],
        itemRenderer: customItemRenderer
    }
];

function getFeedItems(queryText) {
    // As an example of an asynchronous action, return a promise that resolves after
    // a 100ms timeout. This can be a server request or any sort of delayed action.
    return new Promise(resolve => {
        setTimeout(() => {
            const itemsToDisplay = items
            // Filter out the full list of all items to only those matching the query text.
                .filter(isItemMatching)
            // Return 10 items max - needed for generic queries when the list may contain
            // hundreds of elements.
                .slice(0, 10);

            resolve(itemsToDisplay);
        }, 100);
    });

    // Filtering function - it uses `name` and `username` properties of an item to
    // find a match.
    function isItemMatching(item) {
        // Make the search case-insensitive.
        const searchString = queryText.toLowerCase();

        // Include an item in the search results if name or username includes the
        // current user input.
        return (item.name.toLowerCase().includes(searchString) || item.id.toLowerCase().includes(searchString));
    }
}

function customItemRenderer(item) {
    const itemElement = document.createElement('span');

    itemElement
        .classList
        .add('custom-item');
    itemElement.id = `mention-list-item-id-${item.userId}`;
    itemElement.textContent = `${item.name} `;

    const usernameElement = document.createElement('span');

    usernameElement
        .classList
        .add('custom-item-username');
    usernameElement.textContent = item.id;

    itemElement.appendChild(usernameElement);

    return itemElement;
}

class InputEditor extends Component {
    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
    }
    render() {
        const {value, onChange, name, placeholder, label, readOnly=false} = this.props;
        
        const EditorConfig = {
            extraPlugins: [
                Essentials,
                Paragraph,
                Mention,
                MentionLinks,
                Bold,
                Italic,
                Underline,
                Strikethrough,
                Link,
                BalloonToolbar
            ],
            mention: {
                feeds: items
            },
            isReadOnly: readOnly
        }
        const toolBar = {
            items: [
                'bold',
                'italic',
                'underline',
                'strikethrough',
                '|',
                'link',
                '|',
                'undo',
                'redo'
            ],
            shouldNotGroupWhenFull: true
        };
        EditorConfig.balloonToolbar = toolBar;
        
        
        
        return (
            <div className="input-editor">
                {
                    label ?
                    <label className="label">{label}</label>
                    :
                    ""
                }
                
                <CKEditor
                    disabled={readOnly}
                    config={{
                        ...EditorConfig,
                        placeholder: placeholder || ""
                    }}
                    editor={ClassicEditor}
                    data={value}
                    onInit={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange({
                        target: {
                            name: name || "inputEditor",
                            value: data
                        }
                    },data);
                }}
                    onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                    onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}/>
            </div>
        )
    }
}
export default InputEditor;