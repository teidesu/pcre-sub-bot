import { PCRE2_LIB } from './env.ts'

const library = Deno.dlopen(PCRE2_LIB, {
    pcre2_compile_8: {
        parameters: ['buffer', 'usize', 'u32', 'pointer', 'pointer', 'pointer'],
        result: 'pointer',
    },
    pcre2_substitute_8: {
        parameters: [
            'pointer',
            'buffer',
            'u32',
            'u32',
            'u32',
            'pointer',
            'pointer',
            'buffer',
            'u32',
            'buffer',
            'pointer',
        ],
        result: 'i32',
    },
    pcre2_code_free_8: {
        parameters: ['pointer'],
        result: 'void',
    },
} as const)

const PCRE2_NOTBOL = 0x0000000
const PCRE2_NOTEOL = 0x0000000
const PCRE2_NOTEMPTY = 0x00000004
const PCRE2_NOTEMPTY_ATSTART = 0x00000008
const PCRE2_PARTIAL_SOFT = 0x0000001
const PCRE2_PARTIAL_HARD = 0x0000002
const PCRE2_DFA_RESTART = 0x00000040
const PCRE2_DFA_SHORTEST = 0x00000080
const PCRE2_SUBSTITUTE_GLOBAL = 0x00000100
const PCRE2_SUBSTITUTE_EXTENDED = 0x00000200
const PCRE2_SUBSTITUTE_UNSET_EMPTY = 0x00000400
const PCRE2_SUBSTITUTE_UNKNOWN_UNSET = 0x00000800
const PCRE2_SUBSTITUTE_OVERFLOW_LENGTH = 0x00001000
const PCRE2_NO_JIT = 0x00002000
const PCRE2_COPY_MATCHED_SUBJECT = 0x0000400
const PCRE2_SUBSTITUTE_LITERAL = 0x00008000
const PCRE2_SUBSTITUTE_MATCHED = 0x00010000
const PCRE2_SUBSTITUTE_REPLACEMENT_ONLY = 0x00020000
const PCRE2_DISABLE_RECURSELOOP_CHECK = 0x00040000
const PCRE2_ANCHORED = 0x80000000
const PCRE2_NO_UTF_CHECK = 0x40000000
const PCRE2_ENDANCHORED = 0x20000000
const PCRE2_ALLOW_EMPTY_CLASS = 0x00000001
const PCRE2_ALT_BSUX = 0x00000002
const PCRE2_AUTO_CALLOUT = 0x00000004
const PCRE2_CASELESS = 0x00000008
const PCRE2_DOLLAR_ENDONLY = 0x00000010
const PCRE2_DOTALL = 0x00000020
const PCRE2_DUPNAMES = 0x00000040
const PCRE2_EXTENDED = 0x00000080
const PCRE2_FIRSTLINE = 0x00000100
const PCRE2_MATCH_UNSET_BACKREF = 0x00000200
const PCRE2_MULTILINE = 0x00000400
const PCRE2_NEVER_UCP = 0x00000800
const PCRE2_NEVER_UTF = 0x00001000
const PCRE2_NO_AUTO_CAPTURE = 0x00002000
const PCRE2_NO_AUTO_POSSESS = 0x00004000
const PCRE2_NO_DOTSTAR_ANCHOR = 0x00008000
const PCRE2_NO_START_OPTIMIZE = 0x00010000
const PCRE2_UCP = 0x00020000
const PCRE2_UNGREEDY = 0x00040000
const PCRE2_UTF = 0x00080000
const PCRE2_NEVER_BACKSLASH_C = 0x00100000
const PCRE2_ALT_CIRCUMFLEX = 0x00200000
const PCRE2_ALT_VERBNAMES = 0x00400000
const PCRE2_USE_OFFSET_LIMIT = 0x00800000
const PCRE2_EXTENDED_MORE = 0x01000000
const PCRE2_LITERAL = 0x02000000
const PCRE2_MATCH_INVALID_UTF = 0x04000000

const PCRE2_ERRORS = {
    [101]: 'PCRE2_ERROR_END_BACKSLASH',
    [102]: 'PCRE2_ERROR_END_BACKSLASH_C',
    [103]: 'PCRE2_ERROR_UNKNOWN_ESCAPE',
    [104]: 'PCRE2_ERROR_QUANTIFIER_OUT_OF_ORDER',
    [105]: 'PCRE2_ERROR_QUANTIFIER_TOO_BIG',
    [106]: 'PCRE2_ERROR_MISSING_SQUARE_BRACKET',
    [107]: 'PCRE2_ERROR_ESCAPE_INVALID_IN_CLASS',
    [108]: 'PCRE2_ERROR_CLASS_RANGE_ORDER',
    [109]: 'PCRE2_ERROR_QUANTIFIER_INVALID',
    [110]: 'PCRE2_ERROR_INTERNAL_UNEXPECTED_REPEAT',
    [111]: 'PCRE2_ERROR_INVALID_AFTER_PARENS_QUERY',
    [112]: 'PCRE2_ERROR_POSIX_CLASS_NOT_IN_CLASS',
    [113]: 'PCRE2_ERROR_POSIX_NO_SUPPORT_COLLATING',
    [114]: 'PCRE2_ERROR_MISSING_CLOSING_PARENTHESIS',
    [115]: 'PCRE2_ERROR_BAD_SUBPATTERN_REFERENCE',
    [116]: 'PCRE2_ERROR_NULL_PATTERN',
    [117]: 'PCRE2_ERROR_BAD_OPTIONS',
    [118]: 'PCRE2_ERROR_MISSING_COMMENT_CLOSING',
    [119]: 'PCRE2_ERROR_PARENTHESES_NEST_TOO_DEEP',
    [120]: 'PCRE2_ERROR_PATTERN_TOO_LARGE',
    [121]: 'PCRE2_ERROR_HEAP_FAILED',
    [122]: 'PCRE2_ERROR_UNMATCHED_CLOSING_PARENTHESIS',
    [123]: 'PCRE2_ERROR_INTERNAL_CODE_OVERFLOW',
    [124]: 'PCRE2_ERROR_MISSING_CONDITION_CLOSING',
    [125]: 'PCRE2_ERROR_LOOKBEHIND_NOT_FIXED_LENGTH',
    [126]: 'PCRE2_ERROR_ZERO_RELATIVE_REFERENCE',
    [127]: 'PCRE2_ERROR_TOO_MANY_CONDITION_BRANCHES',
    [128]: 'PCRE2_ERROR_CONDITION_ASSERTION_EXPECTED',
    [129]: 'PCRE2_ERROR_BAD_RELATIVE_REFERENCE',
    [130]: 'PCRE2_ERROR_UNKNOWN_POSIX_CLASS',
    [131]: 'PCRE2_ERROR_INTERNAL_STUDY_ERROR',
    [132]: 'PCRE2_ERROR_UNICODE_NOT_SUPPORTED',
    [133]: 'PCRE2_ERROR_PARENTHESES_STACK_CHECK',
    [134]: 'PCRE2_ERROR_CODE_POINT_TOO_BIG',
    [135]: 'PCRE2_ERROR_LOOKBEHIND_TOO_COMPLICATED',
    [136]: 'PCRE2_ERROR_LOOKBEHIND_INVALID_BACKSLASH_C',
    [137]: 'PCRE2_ERROR_UNSUPPORTED_ESCAPE_SEQUENCE',
    [138]: 'PCRE2_ERROR_CALLOUT_NUMBER_TOO_BIG',
    [139]: 'PCRE2_ERROR_MISSING_CALLOUT_CLOSING',
    [140]: 'PCRE2_ERROR_ESCAPE_INVALID_IN_VERB',
    [141]: 'PCRE2_ERROR_UNRECOGNIZED_AFTER_QUERY_P',
    [142]: 'PCRE2_ERROR_MISSING_NAME_TERMINATOR',
    [143]: 'PCRE2_ERROR_DUPLICATE_SUBPATTERN_NAME',
    [144]: 'PCRE2_ERROR_INVALID_SUBPATTERN_NAME',
    [145]: 'PCRE2_ERROR_UNICODE_PROPERTIES_UNAVAILABLE',
    [146]: 'PCRE2_ERROR_MALFORMED_UNICODE_PROPERTY',
    [147]: 'PCRE2_ERROR_UNKNOWN_UNICODE_PROPERTY',
    [148]: 'PCRE2_ERROR_SUBPATTERN_NAME_TOO_LONG',
    [149]: 'PCRE2_ERROR_TOO_MANY_NAMED_SUBPATTERNS',
    [150]: 'PCRE2_ERROR_CLASS_INVALID_RANGE',
    [151]: 'PCRE2_ERROR_OCTAL_BYTE_TOO_BIG',
    [152]: 'PCRE2_ERROR_INTERNAL_OVERRAN_WORKSPACE',
    [153]: 'PCRE2_ERROR_INTERNAL_MISSING_SUBPATTERN',
    [154]: 'PCRE2_ERROR_DEFINE_TOO_MANY_BRANCHES',
    [155]: 'PCRE2_ERROR_BACKSLASH_O_MISSING_BRACE',
    [156]: 'PCRE2_ERROR_INTERNAL_UNKNOWN_NEWLINE',
    [157]: 'PCRE2_ERROR_BACKSLASH_G_SYNTAX',
    [158]: 'PCRE2_ERROR_PARENS_QUERY_R_MISSING_CLOSING',
    [159]: 'PCRE2_ERROR_VERB_ARGUMENT_NOT_ALLOWED',
    [160]: 'PCRE2_ERROR_VERB_UNKNOWN',
    [161]: 'PCRE2_ERROR_SUBPATTERN_NUMBER_TOO_BIG',
    [162]: 'PCRE2_ERROR_SUBPATTERN_NAME_EXPECTED',
    [163]: 'PCRE2_ERROR_INTERNAL_PARSED_OVERFLOW',
    [164]: 'PCRE2_ERROR_INVALID_OCTAL',
    [165]: 'PCRE2_ERROR_SUBPATTERN_NAMES_MISMATCH',
    [166]: 'PCRE2_ERROR_MARK_MISSING_ARGUMENT',
    [167]: 'PCRE2_ERROR_INVALID_HEXADECIMAL',
    [168]: 'PCRE2_ERROR_BACKSLASH_C_SYNTAX',
    [169]: 'PCRE2_ERROR_BACKSLASH_K_SYNTAX',
    [170]: 'PCRE2_ERROR_INTERNAL_BAD_CODE_LOOKBEHINDS',
    [171]: 'PCRE2_ERROR_BACKSLASH_N_IN_CLASS',
    [172]: 'PCRE2_ERROR_CALLOUT_STRING_TOO_LONG',
    [173]: 'PCRE2_ERROR_UNICODE_DISALLOWED_CODE_POINT',
    [174]: 'PCRE2_ERROR_UTF_IS_DISABLED',
    [175]: 'PCRE2_ERROR_UCP_IS_DISABLED',
    [176]: 'PCRE2_ERROR_VERB_NAME_TOO_LONG',
    [177]: 'PCRE2_ERROR_BACKSLASH_U_CODE_POINT_TOO_BIG',
    [178]: 'PCRE2_ERROR_MISSING_OCTAL_OR_HEX_DIGITS',
    [179]: 'PCRE2_ERROR_VERSION_CONDITION_SYNTAX',
    [180]: 'PCRE2_ERROR_INTERNAL_BAD_CODE_AUTO_POSSESS',
    [181]: 'PCRE2_ERROR_CALLOUT_NO_STRING_DELIMITER',
    [182]: 'PCRE2_ERROR_CALLOUT_BAD_STRING_DELIMITER',
    [183]: 'PCRE2_ERROR_BACKSLASH_C_CALLER_DISABLED',
    [184]: 'PCRE2_ERROR_QUERY_BARJX_NEST_TOO_DEEP',
    [185]: 'PCRE2_ERROR_BACKSLASH_C_LIBRARY_DISABLED',
    [186]: 'PCRE2_ERROR_PATTERN_TOO_COMPLICATED',
    [187]: 'PCRE2_ERROR_LOOKBEHIND_TOO_LONG',
    [188]: 'PCRE2_ERROR_PATTERN_STRING_TOO_LONG',
    [189]: 'PCRE2_ERROR_INTERNAL_BAD_CODE',
    [190]: 'PCRE2_ERROR_INTERNAL_BAD_CODE_IN_SKIP',
    [191]: 'PCRE2_ERROR_NO_SURROGATES_IN_UTF16',
    [192]: 'PCRE2_ERROR_BAD_LITERAL_OPTIONS',
    [193]: 'PCRE2_ERROR_SUPPORTED_ONLY_IN_UNICODE',
    [194]: 'PCRE2_ERROR_INVALID_HYPHEN_IN_OPTIONS',
    [195]: 'PCRE2_ERROR_ALPHA_ASSERTION_UNKNOWN',
    [196]: 'PCRE2_ERROR_SCRIPT_RUN_NOT_AVAILABLE',
    [197]: 'PCRE2_ERROR_TOO_MANY_CAPTURES',
    [198]: 'PCRE2_ERROR_CONDITION_ATOMIC_ASSERTION_EXPECTED',
    [199]: 'PCRE2_ERROR_BACKSLASH_K_IN_LOOKAROUND',
    [-1]: 'PCRE2_ERROR_NOMATCH',
    [-2]: 'PCRE2_ERROR_PARTIAL',
    [-3]: 'PCRE2_ERROR_UTF8_ERR1',
    [-4]: 'PCRE2_ERROR_UTF8_ERR2',
    [-5]: 'PCRE2_ERROR_UTF8_ERR3',
    [-6]: 'PCRE2_ERROR_UTF8_ERR4',
    [-7]: 'PCRE2_ERROR_UTF8_ERR5',
    [-8]: 'PCRE2_ERROR_UTF8_ERR6',
    [-9]: 'PCRE2_ERROR_UTF8_ERR7',
    [-10]: 'PCRE2_ERROR_UTF8_ERR8',
    [-11]: 'PCRE2_ERROR_UTF8_ERR9',
    [-12]: 'PCRE2_ERROR_UTF8_ERR10',
    [-13]: 'PCRE2_ERROR_UTF8_ERR11',
    [-14]: 'PCRE2_ERROR_UTF8_ERR12',
    [-15]: 'PCRE2_ERROR_UTF8_ERR13',
    [-16]: 'PCRE2_ERROR_UTF8_ERR14',
    [-17]: 'PCRE2_ERROR_UTF8_ERR15',
    [-18]: 'PCRE2_ERROR_UTF8_ERR16',
    [-19]: 'PCRE2_ERROR_UTF8_ERR17',
    [-20]: 'PCRE2_ERROR_UTF8_ERR18',
    [-21]: 'PCRE2_ERROR_UTF8_ERR19',
    [-22]: 'PCRE2_ERROR_UTF8_ERR20',
    [-23]: 'PCRE2_ERROR_UTF8_ERR21',
    [-24]: 'PCRE2_ERROR_UTF16_ERR1',
    [-25]: 'PCRE2_ERROR_UTF16_ERR2',
    [-26]: 'PCRE2_ERROR_UTF16_ERR3',
    [-27]: 'PCRE2_ERROR_UTF32_ERR1',
    [-28]: 'PCRE2_ERROR_UTF32_ERR2',
    [-29]: 'PCRE2_ERROR_BADDATA',
    [-30]: 'PCRE2_ERROR_MIXEDTABLES',
    [-31]: 'PCRE2_ERROR_BADMAGIC',
    [-32]: 'PCRE2_ERROR_BADMODE',
    [-33]: 'PCRE2_ERROR_BADOFFSET',
    [-34]: 'PCRE2_ERROR_BADOPTION',
    [-35]: 'PCRE2_ERROR_BADREPLACEMENT',
    [-36]: 'PCRE2_ERROR_BADUTFOFFSET',
    [-37]: 'PCRE2_ERROR_CALLOUT',
    [-38]: 'PCRE2_ERROR_DFA_BADRESTART',
    [-39]: 'PCRE2_ERROR_DFA_RECURSE',
    [-40]: 'PCRE2_ERROR_DFA_UCOND',
    [-41]: 'PCRE2_ERROR_DFA_UFUNC',
    [-42]: 'PCRE2_ERROR_DFA_UITEM',
    [-43]: 'PCRE2_ERROR_DFA_WSSIZE',
    [-44]: 'PCRE2_ERROR_INTERNAL',
    [-45]: 'PCRE2_ERROR_JIT_BADOPTION',
    [-46]: 'PCRE2_ERROR_JIT_STACKLIMIT',
    [-47]: 'PCRE2_ERROR_MATCHLIMIT',
    [-48]: 'PCRE2_ERROR_NOMEMORY',
    [-49]: 'PCRE2_ERROR_NOSUBSTRING',
    [-50]: 'PCRE2_ERROR_NOUNIQUESUBSTRING',
    [-51]: 'PCRE2_ERROR_NULL',
    [-52]: 'PCRE2_ERROR_RECURSELOOP',
    [-53]: 'PCRE2_ERROR_DEPTHLIMIT',
    [-54]: 'PCRE2_ERROR_UNAVAILABLE',
    [-55]: 'PCRE2_ERROR_UNSET',
    [-56]: 'PCRE2_ERROR_BADOFFSETLIMIT',
    [-57]: 'PCRE2_ERROR_BADREPESCAPE',
    [-58]: 'PCRE2_ERROR_REPMISSINGBRACE',
    [-59]: 'PCRE2_ERROR_BADSUBSTITUTION',
    [-60]: 'PCRE2_ERROR_BADSUBSPATTERN',
    [-61]: 'PCRE2_ERROR_TOOMANYREPLACE',
    [-62]: 'PCRE2_ERROR_BADSERIALIZEDDATA',
    [-63]: 'PCRE2_ERROR_HEAPLIMIT',
    [-64]: 'PCRE2_ERROR_CONVERT_SYNTAX',
    [-65]: 'PCRE2_ERROR_INTERNAL_DUPMATCH',
    [-66]: 'PCRE2_ERROR_DFA_UINVALID_UTF',
    [-67]: 'PCRE2_ERROR_INVALIDOFFSET',
} as Record<number, string>

const lastErr = new Uint32Array(1)
const lastErrPtr = Deno.UnsafePointer.of(lastErr)
const lastErrOffset = new Uint32Array(1)
const lastErrOffsetPtr = Deno.UnsafePointer.of(lastErrOffset)
const outLen = new Uint32Array(1)
const outLenPtr = Deno.UnsafePointer.of(outLen)

export function compile(pattern: string, options?: string): Deno.PointerValue {
    const patternBuf = new TextEncoder().encode(pattern)

    let flags: number = PCRE2_UTF

    if (options) {
        for (const opt of options.split('')) {
            switch (opt) {
                case 'i':
                    flags |= PCRE2_CASELESS
                    break
                case 'm':
                    flags |= PCRE2_MULTILINE
                    break
                case 's':
                    flags |= PCRE2_DOTALL
                    break
                case 'u':
                    flags |= PCRE2_UCP
                    break
                case 'x':
                    flags |= PCRE2_EXTENDED
                    break
                default:
                    throw new Error(`Unknown option: ${opt}`)
            }
        }
    }

    const code = library.symbols.pcre2_compile_8(
        patternBuf,
        BigInt(patternBuf.byteLength),
        flags,
        lastErrPtr,
        lastErrOffsetPtr,
        null,
    )

    if (!code) {
        throw new Error(
            `PCRE2 error: ${PCRE2_ERRORS[lastErr[0]] || lastErr[0]}`,
        )
    }

    return code
}

const DEFAULT_RESULT_BUF = new Uint8Array(1024)

export function substitute(
    code: Deno.PointerValue,
    subject: string,
    replacement: string,
    global = false,
): string {
    const subjectBuf = new TextEncoder().encode(subject)
    const replacementBuf = new TextEncoder().encode(replacement)

    let resultBuf = DEFAULT_RESULT_BUF

    const flags =
        PCRE2_SUBSTITUTE_EXTENDED |
        PCRE2_SUBSTITUTE_OVERFLOW_LENGTH |
        (global ? PCRE2_SUBSTITUTE_GLOBAL : 0)

    outLen[0] = resultBuf.byteLength
    let res = library.symbols.pcre2_substitute_8(
        code,
        subjectBuf,
        subjectBuf.byteLength,
        0,
        flags,
        null,
        null,
        replacementBuf,
        replacementBuf.byteLength,
        resultBuf,
        outLenPtr,
    )

    if (res === -48 /* PCRE2_ERROR_NOMEMORY */) {
        resultBuf = new Uint8Array(outLen[0])
        res = library.symbols.pcre2_substitute_8(
            code,
            subjectBuf,
            subjectBuf.byteLength,
            0,
            flags,
            null,
            null,
            replacementBuf,
            replacementBuf.byteLength,
            resultBuf,
            outLenPtr,
        )
    }

    if (res < 0) {
        throw new Error(`PCRE2 error: ${PCRE2_ERRORS[res] || res}`)
    }

    return new TextDecoder().decode(resultBuf.slice(0, outLen[0]))
}

export function free(code: Deno.PointerValue): void {
    library.symbols.pcre2_code_free_8(code)
}
