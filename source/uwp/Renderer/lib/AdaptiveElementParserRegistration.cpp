#include "pch.h"
#include "AdaptiveElementParserRegistration.h"
#include "Util.h"

using namespace Microsoft::WRL;
using namespace ABI::AdaptiveCards::XamlCardRenderer;
using namespace ABI::Windows::UI;

namespace AdaptiveCards { namespace XamlCardRenderer
{
    AdaptiveElementParserRegistration::AdaptiveElementParserRegistration()
    {
    }

    HRESULT AdaptiveElementParserRegistration::RuntimeClassInitialize() noexcept try
    {
        m_registration = std::make_shared<RegistrationMap>();
        return S_OK;
    } CATCH_RETURN;

    _Use_decl_annotations_
    HRESULT AdaptiveElementParserRegistration::Set(HSTRING type, IAdaptiveElementParser* Parser)
    {
        ComPtr<IAdaptiveElementParser> localParser(Parser);
        (*m_registration)[TypeAsRegistrationKey(type)] = localParser;

        return S_OK;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveElementParserRegistration::Get(HSTRING type, IAdaptiveElementParser** result)
    {
        *result = nullptr;

        RegistrationMap::iterator found = m_registration->find(TypeAsRegistrationKey(type));
        if (found != m_registration->end())
        {
            *result = found->second.Get();
        }
        return S_OK;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveElementParserRegistration::Remove(HSTRING type)
    {
        m_registration->erase(TypeAsRegistrationKey(type));
        return S_OK;
    }

    _Use_decl_annotations_
    std::string AdaptiveElementParserRegistration::TypeAsRegistrationKey(HSTRING type)
    {
        std::string typeAsKey;
        HStringToUTF8(type, typeAsKey);
        return typeAsKey;
    }

    _Use_decl_annotations_
    HRESULT AdaptiveElementParserRegistrationStaticsImpl::GetDefault(IAdaptiveElementParserRegistration **result)
    {
        return S_OK;
    }

}}