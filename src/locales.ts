/** Locale catalogs reported by getConfigs. */
/** Tags grouped by language: 'arAEBH' is ar-AE, ar-BH. Regions are two letters or three digits. */
export const STANDARD_LOCALES = (): string[] =>
  'aaER afNAZA amET arAEBHDJDZEGERILIQJOKMKWLBLYMAMROMPSQASASDSOSYTDTNYE ayBO azAZ beBY bgBG biVU bnBD bsBAME bynER caAD chGUMP csCZ daDK deATBECHDELILUVA dvMV dzBT elCYGR enAGAIAQASAUBBBMBSBWBZCACCCKCMCWCXDMERFJFKFMGBGDGGGHGIGMGSGUGYHMIEIMINIOJEJMKEKIKNKYLCLRLSMGMHMPMSMTMUMWNANFNGNRNUNZPGPHPKPNPRPWRWSBSCSDSGSHSLSSSXSZTCTKTOTTTVTZUGUMUSVCVGVIVUWSZAZMZW esARBOCLCOCRCUDOEAECESGQGTHNICMXNIPAPEPHPRPYSVUSUYVE etEE euES faAFIR ffSN fiFI fjFJ foFO frBEBFBIBJBLCACDCFCGCHCICMDJDZFRGAGFGNGPGQHTKMLUMAMCMFMGMLMQMRMUNCNEPFPMRERWSCSNSYTDTGTNVUWFYT fyNL gaIE gdGB glES gnPY guIN gvIM haGHNENG heIL hiIN hoPG hrBAHR htHT huHU hyAM idID ieEE igNG iiCN isIS itCHITSMVA jaJP kaGE kgCD kkKZ klGL kmKH knIN koKPKR kuTR kwGB kyKG laVA lbLU lgUG lnCDCF loLA ltLT luCD lvLV mgMG mhMH miNZ mkMK mlIN mnMN mrIN msBNMYSG mtMT myMM naNR nbNOSJ ndZW neINNP nlAWBEBQCWNLSRSX nnNO noNO nrZA nsoZA nyMW ocFR omETKE orIN osGE paINPK plPL psAF ptAOBRCVGWMOMZPTSTTL quBOECPE rmCH rnBI roMDRO ruBYKGKZMDRUUA rwRW saIN scIT sdPK seFINOSE sgCF siLK skSK slSI smASWS snZW soDJETKESO sqALMK srBAMERS ssSZZA stLSZA svAXFISE swCDKETZUG taINLKMYSG teIN tgTJ thTH tiERET tkTM tlPH tnBWZA toTO trCYTR tsZA ttRU tyPF ugCN ukUA urINPK uzAFUZ veZA viVN woSN xhZA yi001 yoBJNG zhCNHKMOSGTW zuZA'
    .split(' ')
    .flatMap((group) => {
      const language = group.match(/^[a-z]+/)![0];
      return group
        .slice(language.length)
        .match(/[A-Z]{2}|\d{3}/g)!
        .map((region) => language + '-' + region);
    });

/** Two-character base-36 indexes into STANDARD_LOCALES, or literal tags absent from it. */
const expand = (packed: string, standard: string[]) =>
  packed
    .match(/[a-z]{2,3}-[A-Z]{2}|[\da-z]{2}/g)!
    .map((token) => (token.includes('-') ? token : standard[parseInt(token, 36)]));

export const POPULAR_LOCALES = (): string[] =>
  expand('3r23495b1a6v8n6y76b2b6960m6iacal8k85a116894u', STANDARD_LOCALES());

export const LOCALES_BY_REGION = (): Record<string, string[]> => {
  const standard = STANDARD_LOCALES();
  return Object.fromEntries(
    'North America:3r1s4e524m;Europe:235b1a6v498s85a116894u8k9617194x826u159h6n910w6l9i4p7i7g1h7t68cy-GB6t4w4qca-ES6a;Asia:6y76b2b6b36iac6paw7ragas0ya6aa7n746c8g8ias-IN809g7u737f6z6o0u7179auabaf7oapbo-CN;South America:8n4043424h4o484n4k415d862b;Africa:080h070r0g0n0oa3a4a5023x5z575o4y5t615453555c58595n5x4z8m8r8o8p8t03ae8e9p09ad;Oceania:1m3220333a3ven-NCen-PF3w3l2k3n302r22387l4v9kajao;Middle East:0m040l0e050j0s0c0f0p0b0a0k6h4s4ral77'
      .split(';')
      .map((entry) => {
        const [region, tokens] = entry.split(':');
        return [region, expand(tokens, standard)];
      }),
  );
};
