# -*- coding: utf-8 -*-
# code generated by Prisma. DO NOT EDIT.
# pyright: reportUnusedImport=false
# fmt: off

# global imports for type checking
import sys
import decimal
import datetime
from typing import (
    TYPE_CHECKING,
    Optional,
    Iterable,
    Iterator,
    Callable,
    Generic,
    Mapping,
    Tuple,
    Union,
    List,
    Dict,
    Type,
    Any,
    Set,
    overload,
    cast,
)
from typing_extensions import TypedDict, Literal


LiteralString = str
# -- template models.py.jinja --
import os
import logging
import inspect
import warnings
from pydantic import BaseConfig, BaseModel, Field, validator

from . import types, enums, errors, fields
from ._types import BaseModelT, FuncType
from .builder import serialize_base64
from .generator import partial_models_ctx, PartialModelField


class Config(BaseConfig):
    use_enum_values: bool = True
    arbitrary_types_allowed: bool = True
    allow_population_by_field_name: bool = True
    json_encoders: Dict[Union[Type[Any], str], FuncType] = {
        fields.Base64: serialize_base64,
    }


log: logging.Logger = logging.getLogger(__name__)
_created_partial_types: Set[str] = set()

# packages that implicitly subclass models
# this should not raise any warnings as users
# of these packages cannot do anything about it
_implicit_subclass_packages: Set[str] = {
    'fastapi',
}


def _maybe_warn_subclassing(new_model: str, base_model: str, *, stacklevel: int = 3) -> None:
    # at least 3 frames are guaranteed to exist if we are being called from __init_subclass__
    # stack: 1 = __init_subclass__, 2 = abc, 3 = <caller>
    try:
        frame = inspect.stack()[stacklevel]
        module = inspect.getmodule(frame[0])
        if module is not None:
            name, *_ = module.__name__.split('.')
            if name in _implicit_subclass_packages:
                return
    except Exception as exc:
        # disabling subclass warnings depending on the caller module is not a mission critical
        # feature, users can disable these warnings themselves
        # https://github.com/RobertCraigie/prisma-client-py/issues/278#issuecomment-1031421561
        log.debug('Ignoring exception encountered during stack inspection check: %s', str(exc))

    message = (
        'Subclassing models while using pseudo-recursive types may cause unexpected '
        'errors when static type checking;\n'
        'You can disable this warning by generating fully recursive types: \n'
        'https://prisma-client-py.readthedocs.io/en/stable/reference/config/#recursive\n'
        'or if that is not possible you can pass warn_subclass=False e.g.\n'
        f'  class {new_model}(prisma.models.{base_model}, warn_subclass=False):'
    )
    warnings.warn(message, errors.UnsupportedSubclassWarning, stacklevel=4)


class Similarity(BaseModel):
    """Represents a Similarity record"""

    id: str
    similarity: int
    imageUrl: str
    cloned: Optional[List['models.ClosestSimilarity']]
    copying: Optional[List['models.ClosestSimilarity']]

    Config = Config

    @classmethod
    def prisma(cls) -> 'actions.SimilarityActions':
        from .client import get_client

        return actions.SimilarityActions(get_client(), cls)

    # take *args and **kwargs so that other metaclasses can define arguments
    def __init_subclass__(
        cls,
        *args: Any,
        warn_subclass: bool = True,
        **kwargs: Any,
    ) -> None:
        super().__init_subclass__()
        if warn_subclass:
            _maybe_warn_subclassing(cls.__name__, 'Similarity', stacklevel=3)

    @staticmethod
    def create_partial(
        name: str,
        include: Optional[Iterable['types.SimilarityKeys']] = None,
        exclude: Optional[Iterable['types.SimilarityKeys']] = None,
        required: Optional[Iterable['types.SimilarityKeys']] = None,
        optional: Optional[Iterable['types.SimilarityKeys']] = None,
        relations: Optional[Mapping['types.SimilarityRelationalFieldKeys', str]] = None,
        exclude_relational_fields: bool = False,
    ) -> None:
        if not os.environ.get('PRISMA_GENERATOR_INVOCATION'):
            raise RuntimeError(
                'Attempted to create a partial type outside of client generation.'
            )

        if name in _created_partial_types:
            raise ValueError(f'Partial type "{name}" has already been created.')

        if include is not None and exclude is not None:
            raise TypeError(f'Exclude and include are mutually exclusive.')

        if required and optional:
            shared = set(required) & set(optional)
            if shared:
                raise ValueError(f'Cannot make the same field(s) required and optional {shared}')

        if exclude_relational_fields and relations:
            raise ValueError(
                'exclude_relational_fields and relations are mutually exclusive'
            )

        fields: Dict['types.SimilarityKeys', PartialModelField] = {}

        try:
            if include:
                for field in include:
                    fields[field] = _Similarity_fields[field]
            elif exclude:
                for field in exclude:
                    if field not in _Similarity_fields:
                        raise KeyError(field)

                fields = {
                    key: data
                    for key, data in _Similarity_fields.items()
                    if key not in exclude
                }
            else:
                fields = _Similarity_fields.copy()

            if required:
                for field in required:
                    fields[field] = fields[field].copy()
                    fields[field]['optional'] = False

            if optional:
                for field in optional:
                    fields[field] = fields[field].copy()
                    fields[field]['optional'] = True

            if exclude_relational_fields:
                fields = {
                    key: data
                    for key, data in _Similarity_fields.items()
                    if key not in _Similarity_relational_fields
                }

            if relations:
                for field, type_ in relations.items():
                    if field not in _Similarity_relational_fields:
                        raise errors.UnknownRelationalFieldError('Similarity', field)

                    # TODO: this method of validating types is not ideal
                    # as it means we cannot two create partial types that
                    # reference each other
                    if type_ not in _created_partial_types:
                        raise ValueError(
                            f'Unknown partial type: "{type_}". '
                            f'Did you remember to generate the {type_} type before this one?'
                        )

                    # TODO: support non prisma.partials models
                    info = fields[field]
                    if info['is_list']:
                        info['type'] = f'List[\'partials.{type_}\']'
                    else:
                        info['type'] = f'\'partials.{type_}\''
        except KeyError as exc:
            raise ValueError(
                f'{exc.args[0]} is not a valid Similarity / {name} field.'
            ) from None

        models = partial_models_ctx.get()

        # mypy does not like this as we are assigning a
        # Dict[Literal[str]] to a Dict[str] but this is fine
        models[name] = fields  # type: ignore[assignment]
        partial_models_ctx.set(models)
        _created_partial_types.add(name)


class ClosestSimilarity(BaseModel):
    """Represents a ClosestSimilarity record"""

    incomingId: str
    originalId: str
    incoming: Optional['models.Similarity']
    original: Optional['models.Similarity']

    Config = Config

    @classmethod
    def prisma(cls) -> 'actions.ClosestSimilarityActions':
        from .client import get_client

        return actions.ClosestSimilarityActions(get_client(), cls)

    # take *args and **kwargs so that other metaclasses can define arguments
    def __init_subclass__(
        cls,
        *args: Any,
        warn_subclass: bool = True,
        **kwargs: Any,
    ) -> None:
        super().__init_subclass__()
        if warn_subclass:
            _maybe_warn_subclassing(cls.__name__, 'ClosestSimilarity', stacklevel=3)

    @staticmethod
    def create_partial(
        name: str,
        include: Optional[Iterable['types.ClosestSimilarityKeys']] = None,
        exclude: Optional[Iterable['types.ClosestSimilarityKeys']] = None,
        required: Optional[Iterable['types.ClosestSimilarityKeys']] = None,
        optional: Optional[Iterable['types.ClosestSimilarityKeys']] = None,
        relations: Optional[Mapping['types.ClosestSimilarityRelationalFieldKeys', str]] = None,
        exclude_relational_fields: bool = False,
    ) -> None:
        if not os.environ.get('PRISMA_GENERATOR_INVOCATION'):
            raise RuntimeError(
                'Attempted to create a partial type outside of client generation.'
            )

        if name in _created_partial_types:
            raise ValueError(f'Partial type "{name}" has already been created.')

        if include is not None and exclude is not None:
            raise TypeError(f'Exclude and include are mutually exclusive.')

        if required and optional:
            shared = set(required) & set(optional)
            if shared:
                raise ValueError(f'Cannot make the same field(s) required and optional {shared}')

        if exclude_relational_fields and relations:
            raise ValueError(
                'exclude_relational_fields and relations are mutually exclusive'
            )

        fields: Dict['types.ClosestSimilarityKeys', PartialModelField] = {}

        try:
            if include:
                for field in include:
                    fields[field] = _ClosestSimilarity_fields[field]
            elif exclude:
                for field in exclude:
                    if field not in _ClosestSimilarity_fields:
                        raise KeyError(field)

                fields = {
                    key: data
                    for key, data in _ClosestSimilarity_fields.items()
                    if key not in exclude
                }
            else:
                fields = _ClosestSimilarity_fields.copy()

            if required:
                for field in required:
                    fields[field] = fields[field].copy()
                    fields[field]['optional'] = False

            if optional:
                for field in optional:
                    fields[field] = fields[field].copy()
                    fields[field]['optional'] = True

            if exclude_relational_fields:
                fields = {
                    key: data
                    for key, data in _ClosestSimilarity_fields.items()
                    if key not in _ClosestSimilarity_relational_fields
                }

            if relations:
                for field, type_ in relations.items():
                    if field not in _ClosestSimilarity_relational_fields:
                        raise errors.UnknownRelationalFieldError('ClosestSimilarity', field)

                    # TODO: this method of validating types is not ideal
                    # as it means we cannot two create partial types that
                    # reference each other
                    if type_ not in _created_partial_types:
                        raise ValueError(
                            f'Unknown partial type: "{type_}". '
                            f'Did you remember to generate the {type_} type before this one?'
                        )

                    # TODO: support non prisma.partials models
                    info = fields[field]
                    if info['is_list']:
                        info['type'] = f'List[\'partials.{type_}\']'
                    else:
                        info['type'] = f'\'partials.{type_}\''
        except KeyError as exc:
            raise ValueError(
                f'{exc.args[0]} is not a valid ClosestSimilarity / {name} field.'
            ) from None

        models = partial_models_ctx.get()

        # mypy does not like this as we are assigning a
        # Dict[Literal[str]] to a Dict[str] but this is fine
        models[name] = fields  # type: ignore[assignment]
        partial_models_ctx.set(models)
        _created_partial_types.add(name)



_Similarity_relational_fields: Set[str] = {
        'cloned',
        'copying',
    }
_Similarity_fields: Dict['types.SimilarityKeys', PartialModelField] = {
    'id': {
        'name': 'id',
        'is_list': False,
        'optional': False,
        'type': 'str',
        'documentation': None,
    },
    'similarity': {
        'name': 'similarity',
        'is_list': False,
        'optional': False,
        'type': 'int',
        'documentation': None,
    },
    'imageUrl': {
        'name': 'imageUrl',
        'is_list': False,
        'optional': False,
        'type': 'str',
        'documentation': None,
    },
    'cloned': {
        'name': 'cloned',
        'is_list': True,
        'optional': True,
        'type': 'List[\'models.ClosestSimilarity\']',
        'documentation': None,
    },
    'copying': {
        'name': 'copying',
        'is_list': True,
        'optional': True,
        'type': 'List[\'models.ClosestSimilarity\']',
        'documentation': None,
    },
}

_ClosestSimilarity_relational_fields: Set[str] = {
        'incoming',
        'original',
    }
_ClosestSimilarity_fields: Dict['types.ClosestSimilarityKeys', PartialModelField] = {
    'incomingId': {
        'name': 'incomingId',
        'is_list': False,
        'optional': False,
        'type': 'str',
        'documentation': None,
    },
    'originalId': {
        'name': 'originalId',
        'is_list': False,
        'optional': False,
        'type': 'str',
        'documentation': None,
    },
    'incoming': {
        'name': 'incoming',
        'is_list': False,
        'optional': True,
        'type': 'models.Similarity',
        'documentation': None,
    },
    'original': {
        'name': 'original',
        'is_list': False,
        'optional': True,
        'type': 'models.Similarity',
        'documentation': None,
    },
}



# we have to import ourselves as relation types are namespaced to models
# e.g. models.Post
from . import models, actions

# required to support relationships between models
Similarity.update_forward_refs()
ClosestSimilarity.update_forward_refs()
