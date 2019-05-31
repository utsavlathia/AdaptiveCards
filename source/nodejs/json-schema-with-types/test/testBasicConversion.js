var assert = require("assert");
var tschema = require("../lib/json-schema-with-types");

describe("Test transform", function () {
    it("Test description", function () {

		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"description": "An Adaptive Card."
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"description": "An Adaptive Card.",
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							}
						}
					}
				}
			}
		})
	});
	
	it("Test string property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"version": {
							"type": "string",
							"description": "Minimum version this card requires.",
							"examples": [ "1.0", "1.1", "1.2" ]
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"version": {
								"type": "string",
								"description": "Minimum version this card requires.",
								"examples": [ "1.0", "1.1", "1.2" ]
							}
						}
					}
				}
			}
		})
	});
	
	it("Test uri property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"source": {
							"type": "uri",
							"description": "The source of the card."
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"source": {
								"type": "string",
								"format": "uri",
								"description": "The source of the card."
							}
						}
					}
				}
			}
		})
	});
	
	it("Test required property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"version": {
							"type": "string",
							"description": "Minimum version this card requires.",
							"required": true
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"version": {
								"type": "string",
								"description": "Minimum version this card requires."
							}
						},
						"required": [
							"version"
						]
					}
				}
			}
		})
	});
	
	it("Test object property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"moreInfoAction": {
							"type": "Action.OpenUrl",
							"description": "Action to invoke when user wants more info"
						}
					}
				},
				{
					"type": "Action.OpenUrl",
					"description": "An open URL action",
					"properties": {
						"url": {
							"type": "uri",
							"description": "The url to open"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"moreInfoAction": {
								"description": "Action to invoke when user wants more info",
								"$ref": "#/definitions/Action.OpenUrl"
							}
						}
					},
					"Action.OpenUrl": {
						"type": "object",
						"additionalProperties": false,
						"description": "An open URL action",
						"properties": {
							"type": {
								"enum": [ "Action.OpenUrl" ],
								"description": "Must be `Action.OpenUrl`"
							},
							"url": {
								"type": "string",
								"format": "uri",
								"description": "The url to open"
							}
						}
					}
				}
			}
		})
	});

	
	
	it("Test extending classes", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"moreInfoAction": {
							"type": "Action.OpenUrl",
							"description": "Action to invoke when user wants more info"
						}
					}
				},
				{
					"type": "Action.OpenUrl",
					"extends": "Action",
					"description": "An open URL action",
					"properties": {
						"url": {
							"type": "uri",
							"description": "The url to open"
						}
					}
				},
				{
					"type": "Action",
					"isAbstract": true,
					"description": "An action to invoke",
					"properties": {
						"title": {
							"type": "string",
							"description": "The title"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"moreInfoAction": {
								"description": "Action to invoke when user wants more info",
								"$ref": "#/definitions/Action.OpenUrl"
							}
						}
					},
					"Action.OpenUrl": {
						"type": "object",
						"additionalProperties": false,
						"description": "An open URL action",
						"properties": {
							"type": {
								"enum": [ "Action.OpenUrl" ],
								"description": "Must be `Action.OpenUrl`"
							},
							"url": {
								"type": "string",
								"format": "uri",
								"description": "The url to open"
							}
						},
						"allOf": [
							{
								"$ref": "#/definitions/Extendable.Action"
							}
						]
					},
					"Extendable.Action": {
						"type": "object",
						"description": "An action to invoke",
						"properties": {
							"title": {
								"type": "string",
								"description": "The title"
							}
						}
					},
					"ImplementationsOf.Action": {
						"anyOf": [
							{
								"required": [ "type" ],
								"allOf": [
									{
										"$ref": "#/definitions/Action.OpenUrl"
									}
								]
							}
						]
					}
				}
			}
		})
	});



	it("Test referencing base classes", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"moreInfoAction": {
							"type": "Action",
							"description": "Action to invoke when user wants more info"
						}
					}
				},
				{
					"type": "Action.OpenUrl",
					"extends": "Action",
					"properties": {
						"url": {
							"type": "uri"
						}
					}
				},
				{
					"type": "Action.Submit",
					"extends": "Action",
					"properties": {
						"data": {
							"type": "string"
						}
					}
				},
				{
					"type": "Action",
					"isAbstract": true,
					"properties": {
						"title": {
							"type": "string"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"moreInfoAction": {
								"description": "Action to invoke when user wants more info",
								"$ref": "#/definitions/ImplementationsOf.Action"
							}
						}
					},
					"Action.OpenUrl": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "Action.OpenUrl" ],
								"description": "Must be `Action.OpenUrl`"
							},
							"url": {
								"type": "string",
								"format": "uri"
							}
						},
						"allOf": [
							{
								"$ref": "#/definitions/Extendable.Action"
							}
						]
					},
					"Action.Submit": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "Action.Submit" ],
								"description": "Must be `Action.Submit`"
							},
							"data": {
								"type": "string"
							}
						},
						"allOf": [
							{
								"$ref": "#/definitions/Extendable.Action"
							}
						]
					},
					"Extendable.Action": {
						"type": "object",
						"properties": {
							"title": {
								"type": "string"
							}
						}
					},
					"ImplementationsOf.Action": {
						"anyOf": [
							{
								"required": [ "type" ],
								"allOf": [
									{
										"$ref": "#/definitions/Action.OpenUrl"
									}
								]
							},
							{
								"required": [ "type" ],
								"allOf": [
									{
										"$ref": "#/definitions/Action.Submit"
									}
								]
							}
						]
					}
				}
			}
		})
	});


	it("Test uri or object property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"backgroundImage": {
							"type": "uri|BackgroundImage"
						}
					}
				},
				{
					"type": "BackgroundImage",
					"properties": {
						"url": {
							"type": "uri"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"backgroundImage": {
								"anyOf": [
									{
										"type": "string",
										"format": "uri"
									},
									{
										"$ref": "#/definitions/BackgroundImage"
									}
								]
							}
						}
					},
					"BackgroundImage": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "BackgroundImage" ],
								"description": "Must be `BackgroundImage`"
							},
							"url": {
								"type": "string",
								"format": "uri"
							}
						}
					}
				}
			}
		})
	});


	it("Test array of objects property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"actions": {
							"type": "Action.OpenUrl[]"
						}
					}
				},
				{
					"type": "Action.OpenUrl",
					"properties": {
						"url": {
							"type": "uri"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"actions": {
								"type": "array",
								"items": {
									"$ref": "#/definitions/Action.OpenUrl"
								}
							}
						}
					},
					"Action.OpenUrl": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "Action.OpenUrl" ],
								"description": "Must be `Action.OpenUrl`"
							},
							"url": {
								"type": "string",
								"format": "uri"
							}
						}
					}
				}
			}
		})
	});


	it("Test array of string properties", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"titles": {
							"type": "string[]"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"titles": {
								"type": "array",
								"items": {
									"type": "string"
								}
							}
						}
					}
				}
			}
		})
	});


	it("Test array of base classes property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"actions": {
							"type": "Action[]"
						}
					}
				},
				{
					"type": "Action.OpenUrl",
					"extends": "Action",
					"properties": {
						"url": {
							"type": "uri"
						}
					}
				},
				{
					"type": "Action.Submit",
					"extends": "Action",
					"properties": {
						"data": {
							"type": "string"
						}
					}
				},
				{
					"type": "Action",
					"isAbstract": true,
					"properties": {
						"title": {
							"type": "string"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"actions": {
								"type": "array",
								"items": {
									"$ref": "#/definitions/ImplementationsOf.Action"
								}
							}
						}
					},
					"Action.OpenUrl": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "Action.OpenUrl" ],
								"description": "Must be `Action.OpenUrl`"
							},
							"url": {
								"type": "string",
								"format": "uri"
							}
						},
						"allOf": [
							{
								"$ref": "#/definitions/Extendable.Action"
							}
						]
					},
					"Action.Submit": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "Action.Submit" ],
								"description": "Must be `Action.Submit`"
							},
							"data": {
								"type": "string"
							}
						},
						"allOf": [
							{
								"$ref": "#/definitions/Extendable.Action"
							}
						]
					},
					"Extendable.Action": {
						"type": "object",
						"properties": {
							"title": {
								"type": "string"
							}
						}
					},
					"ImplementationsOf.Action": {
						"anyOf": [
							{
								"required": [ "type" ],
								"allOf": [
									{
										"$ref": "#/definitions/Action.OpenUrl"
									}
								]
							},
							{
								"required": [ "type" ],
								"allOf": [
									{
										"$ref": "#/definitions/Action.Submit"
									}
								]
							}
						]
					}
				}
			}
		})
	});


	it("Test dictionary of objects property", function () {
		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"actions": {
							"type": "Dictionary<Action.OpenUrl>"
						}
					}
				},
				{
					"type": "Action.OpenUrl",
					"properties": {
						"url": {
							"type": "uri"
						}
					}
				}
			],
			primaryTypeName: "AdaptiveCard",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"actions": {
								"type": "object",
								"additionalProperties": {
									"$ref": "#/definitions/Action.OpenUrl"
								}
							}
						}
					},
					"Action.OpenUrl": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "Action.OpenUrl" ],
								"description": "Must be `Action.OpenUrl`"
							},
							"url": {
								"type": "string",
								"format": "uri"
							}
						}
					}
				}
			}
		})
	});


	
    it("Test any object as top level", function () {

		assertTransform({
			types: [
				{
					"type": "AdaptiveCard",
					"properties": {
						"version": {
							"type": "string"
						}
					}
				},
				{
					"type": "BasicCard",
					"properties": {
						"title": {
							"type": "string"
						}
					}
				}
			],
			primaryTypeName: ["AdaptiveCard","BasicCard"],
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/AdaptiveCard"
							}
						]
					},
					{
						"required": [ "type" ],
						"allOf": [
							{
								"$ref": "#/definitions/BasicCard"
							}
						]
					}
				],
				"definitions": {
					"AdaptiveCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "AdaptiveCard" ],
								"description": "Must be `AdaptiveCard`"
							},
							"version": {
								"type": "string"
							}
						}
					},
					"BasicCard": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"type": {
								"enum": [ "BasicCard" ],
								"description": "Must be `BasicCard`"
							},
							"title": {
								"type": "string"
							}
						}
					}
				}
			}
		})
	});

	it("Test custom type property name", function () {

		assertTransform({
			types: [
				{
					"type": "Class"
				}
			],
			primaryTypeName: "Class",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"required": [ "classType" ],
						"allOf": [
							{
								"$ref": "#/definitions/Class"
							}
						]
					}
				],
				"definitions": {
					"Class": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"classType": {
								"enum": [ "Class" ],
								"description": "Must be `Class`"
							}
						}
					}
				}
			},
			typePropertyName: "classType"
		})
	});

	it("Test multiple primary types with default", function () {

		assertTransform({
			types: [
				{
					"type": "Class",
					"properties": {
						"type": {
						  "type": "string",
						  "required": true
						},
					}
				},
				{
					"type": "Property",
					"properties": {
						"propertyType": {
						  "type": "string",
						  "required": true
						}
					}
				}
			],
			primaryTypeName: [ "Class", "Property" ],
			defaultPrimaryTypeName: "Class",
			typePropertyName: "classType",
			expected: {
				"$schema": "http://json-schema.org/draft-06/schema#",
				"id": "http://adaptivecards.io/schemas/adaptive-card.json",
				"anyOf": [
					{
						"allOf": [
							{
								"$ref": "#/definitions/Class"
							}
						]
					},
					{
						"required": [ "classType" ],
						"allOf": [
							{
								"$ref": "#/definitions/Property"
							}
						]
					}
				],
				"definitions": {
					"Class": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"classType": {
								"enum": [ "Class" ],
								"description": "Must be `Class`"
							},
							"type": {
								"type": "string"
							}
						},
						"required": [ "type" ]
					},
					"Property": {
						"type": "object",
						"additionalProperties": false,
						"properties": {
							"classType": {
								"enum": [ "Property" ],
								"description": "Must be `Property`"
							},
							"propertyType": {
								"type": "string"
							}
						},
						"required": [ "propertyType" ]
					}
				}
			}
		})
	});
});


function assertTransform(options) {
	var transformed = tschema.transformTypes(options.types, options.primaryTypeName, options.defaultPrimaryTypeName, options.typePropertyName);

	assert.deepStrictEqual(transformed, options.expected, "Transform wasn't equal to expected");
}