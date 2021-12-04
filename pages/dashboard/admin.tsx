import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

import {
    AppBar, Avatar, Box, Button,
    Container, Divider, Drawer,
    IconButton,
    InputAdornment, List, ListItem, ListItemIcon, ListItemText,
    Stack,
    TextField, Toolbar, Typography
} from '@mui/material';
import { AssignmentInd, Book, Home, Logout, Menu, Search } from '@mui/icons-material';

import { useUser } from '@hooks';
import { AddNewBook, BooksTable } from '@components';
import { BookModel } from '@models';
import { requests } from '@backend';

const Admin: NextPage = () => {
    const router = useRouter()
    const { user, loading } = useUser()
    useEffect(() => {
        if (!(user || loading)) {
            // router.push('/auth');
        }
    }, [user, loading])

    const [books, setBooks] = useState<Array<BookModel>>([]);

    useEffect(() => {
        requests.get('/books/all')
            .then((response) => {
                console.log(response);
            }).catch(e => console.log(e))
    }, [])

    // TODO get request from the server
    const rows = Array<BookModel>(
        {
            id: "4",
            type: "physical",
            title: "title QFEAECTZPJMI YUNNGLUAOTIQL JQVNQCECELHOYM",
            isbn: "4119875997",
            author: "author FLYJGUYSY FIMNLRMULAIYEQ",
            description: "description CHOXRLMYOUX KQEIRRYQSDBEZFJ ALGBSFCFXGDJB PHGKANGYTAC RPRDKKQUBHZBE VTSECVDBO AXWPYSMMVEM JOCVQFGSV VMKAKFAHWDEBOYM IZWDIJG AKOQFUPGGWBDIYO JLTGMLXLQO PDBUINJWPTDIF SUINZDWHFN TFPNNBWYZ PJHWVAKQYGMQIRJ MAAHTQCRYH HHRHKTYZ IGHBFWOYVIYEHR SONNWITDOKDD YQKDUBNPDA VSGWLDQSCQ PTRRWFWLPNOA MIKSGYFTJTWYL IMKVHUWLOFWR ASOJPRQVZ EDVRYWGAQIWAJ DRPNJJXLV GJWDPCWJZT BMWEAOH PEQNMDCSSMMNKV RYRUQJCI UDHTHJD VKHQLVL INITNKYMLPPU KURFKJGB GNUADGHUVLG JRAYWUP OBMBLCUNSOEAWYF JNFZHXAIJKX VWBCDGSEO AOVRHTMJRE RHUYDWV CRXRUUVD OXUPWWTAZUMLAM HABACREDKJVKX MJMDXCXLAYDMFR EAEDTBXQPSRAFA SMSLLRLKTINN CPNRJOKICFT MLGKVJYQVZJVM HTSTONH JWXJWFUOD WIPWQGXTRSZW KTCFJTS ZRZWZKSAOITV PLPQRDF UGBRXVILXFBCHL OKIYKWU DKMABCYHL TGPXDNUYSF ECVIKKFYKNGQQQ PBNSPOVWZR FBAFEVMSSBWVVTC IAXHIANOJSZPUHK CDJOCTXGSEFIAMY SJMKEYBYAMYO NKLQXNMEDUNZPZ MZHOZPUGRPOSM OTDBHVQMNXFIYBY ZWLRKPH HDTHNDX PFTSNDNW VRFLNTNJUIZ XLJSODDTKE IDVDJGIPU ULULKEX WBMSUSJJNNP RXZUEEZPYLKEXN PCGBNGNJSGDME EGMJGIXGUSV ZQUOQNQNCLSCWL MMSKWPURKIQJYK PAXDFULUROVA BKJZDMAQAI APRINORAQCI RVOMJPLFOAYT UGDPSNJIGJEC XAFKCRBK DZKEXLWL RNXTKIFJ UPYUHBWEMCUJB AISDJHTLWPCQD NNSPWZKOA DAAYGIFOQEBZGK QWXIXFZZ ANVOMFNYZRF JRJKDKCBN ZHSTDVYVNJAH",
            copy_number: "2",
        },
        {
            id: "7",
            type: "physical",
            title: "title BDXFAKJQUX ZTWQLYMQSHPH RQXQNFKDS",
            isbn: "5553949677",
            author: "author RKMCMJWLSVGAM AVGUOKCUWABA",
            description: "description XVFWUFUECG LXTUSTVZSVFVBMG URLWDANAKY XREQLSUP BQLCBLKVH XCWJWGKBW OWRVRUIPIT RTPYNESJI FSYCVRTTIM CYTFYGCVEVP RUOITCZTRAT NQBVCKYPSFXA BLPSRXXSJQBT YOYLQUVOSYGIXK SBJKBNXVWPDY UAJFOUPQXFO LXETGAOHPVOC JQHRDQUEPPKHQD OTQKRHGWJEDMH HCLGEELLUYQJG CJBDEFOZWENICJ KADIMVOJA CQJULLREZIZ SXSMUENLGLSXN FONEEINPG XSFIOLC QDJKCTACWM SVKAAVO FCRXZINNZII SFCEXEIF KDUWEIYUXDE ARGRCIUKPMB VDSGGFBP EAEWNNBBVGJTE ARWAIQP JANJRDZVGBB EYRJNGLDPHFPD OXMYXBUTELJW DEYOLPTD WKFMFBPVWXF KTPJAUTSZFIJTKO WWMVDECQ QOEBKRLA SJQGQAZUFJMSCF MRHBPIMSHTC TMLCTEDRLCATP MOFHMZPGXX RBXFQFAEL OMICQEBHKTLFJRA FWQUSSLUBTKB EODYEVSIJEKF NHUCJYTV HHRJLNERRGKIC YNEUXYEMRXBAPO PKUVYFLDPKPNZD ANVEBWKNAYTMPQP GNCKRUMGHYZ TCKWMENRQ SLACUPV ZDBBZWY MPJHASWDSDHXMY NLKPADDAGXIPWB VKWSLPEGWZOWZH WGLWELEIGPOCVAY LVZHDYYNPA WCCSXGC PSUKHYKJR BTOHCYANBQZNBJ DEIBBMVSCIPE BCMACIVLOM OQWYJIWILYFP IKILKUJVLPDT BAZAEIFKTPF BKISYBCM HXLIRWUILKOI EXXPBGODY INKUAHANOFF HOACNFOYBVF GGEWVLPYR XOHYFTMCBXPOZM JVOAUHPFCYVFWMR XSWOAWXVIMFFVM ABSNAJABLCHKJJO AFJVEYIRRICD ZJBREFWHESSK BGZZUSLRLQPUQT NQZZABRKDQ YIYMVLYW LDBOTCYZKEA IBWSDKSRNC XJZFNPSWRDGZWHF QJEDOSHDB VDVRPEWN TSXREKZLLED ZFIYEFJYBJXQOFO GHJFGDFLYZPQ RXZKELOEQBC TVCSUANGVZRDYOC",
            copy_number: "5",
        },
        {
            id: "9",
            type: "physical",
            title: "title FRDUBOCI LUQWTAJHC KTCVXIXB",
            isbn: "8347688671",
            author: "author HBOYUETY LPFPBRDMAASK",
            description: "description JYHMFZVQIOWBMV OXMBHMCNXXFBVX ZWNTKJQLMKU BASSZJAGEZXBLKL FTKASETWYJA UFOIXKSLQDMADTM EUBHSLMOURZA PKWJTFTSDFN KSOFTUY XYRSFPFPAFMSY OEQNMWFFE TVRPUAGEJV WZJXMURUYIQATGV YLJMHAYF RADKQHNHQOBPEC ATOIYERSAPX CHMCDHHLR FFLERKWPZOPCAU ZMCHQZNHEMBO GFXTOBOHQ RZACSZQDD BXIXDLL GNEJOJVIJIJIY ZTHRLUUNEAZH OYJFWNZHJE CRKVGERVOHIMJ LARJMJXNN QMZEAJOKOIKBVK VCRCFXGBMKVUSTB GRWLKOCDTRQII GJIEISCJEF CKNKKPN OGUAXGXSD XNBTYAQUGPQYSZM WBCOUBPLKUNGI UWOQFEAQ UTYLYUENZBEIYTP LKMFKDPOI YOTMEQN HGUPHACSZG NHUBLOVER RJGCJVZGY FMBSBWXZCFC WGFQSGKYNITFWZ IMOZAYBBBXP BIIASBGLJFOVQBN LMBYIIGEVDWWG UOBMEUJRYN UTVELNC VXDIWZVMBC OIYRLUSYHTV",
            copy_number: "5",
        },
        {
            id: "10",
            type: "physical",
            title: "title XQRPGSUTWFAPJQ FAEWEYWFEVPM WBCVLYLBSAKVGK",
            isbn: "7446642669",
            author: "author EOARVJEWLN SQSMQMPKQNEOPG",
            description: "description BXVDRCHIFFHKRR OWQESNWXVJB GEJQJKZH KGJNDPNR YYMWUHHWRR VJUDRYIUZLFZL AHEKIHEPMMRFUVZ QDRHUXIDZOFBA KQPCLLQQWUHDPP AYIRDEYTSEFCG QPGZUVIECG SGJIIZXGX ZHBVSRQNNARHE XZVFHCQWT PXXXHUTWJWKB VNUVZFR XGVTZGEXJVGNISR RRSUGAKTPBR KQCRASZOG YTHCWFNGTHGRIIB QOIAQNPTVFIFTVP UEBCFTAAAGQ JNSPUCQOITSX MKMATKCMEOC IDAYDHDIXHEU SEKPCOGQBE OPFDIGOAH ECEHXVKMU YZGEARQ MDORLFEQNLONK XVUPFIMHMLIYMH XHCMRNX ZIXTUOOWIP OYJIGWXA DNAUTQSEOEP ZQPOFVD DNSSAHQKVAKQ AVMSVTLTMMMHXIR NUHZBNPFVK ZJIHFLEBHA VFXSPRSQZQBXDGG URGTHIEMG POXAFIGAYUSE INICCYEVRYFE HPMEXDSQ IXZKAWKKSHPBKG RTMYHEVMPJVK IMWRIRAA TOQSJOLDLKTQOPF XZHBNVSEAYVCYVT CGVEZAWO FCVIPHX EZLRZQATLJDVF QKXDFXKTVGPKSOQ ICWWLXWOULBASJH AIPNRTOMEABNR QENYFZR PWKTHVXHO BDGGGYBSXVTXWDI TZDPKVRI EGLGOBKQDEIRLG IGRBPSORFRBYGJA QZMCMTXTWSIJ QEVBDNART VODIKNVHPAQ WYOWKGADQCNZSVY WDSTEAIXOI PPTKUGMI IMOGDXFWU CNEAZBPQFD XYJCOZTAXN QGHFVSXIGL RKSMTJFK TVPQNXLDIQWK VOGTSNEHNZLJNW ARINMLZF ICMSVTWFW FNHPJFEZTPAGFA",
            copy_number: "3",
        },
        {
            id: "13",
            type: "physical",
            title: "title SOXKRKSLVPM XUFYHZLTJH VMOUXCIQ",
            isbn: "1686231716",
            author: "author AFXXPRHYGTS JSNMMCWIOMHWA",
            description: "description ENKISFETNFDQJ PAEXOQZXL HAXSGUXAKDCFG PLNRSYWKQVLT RBAYRRHLNPYRGTV TMNSBLHYTQP PLEKINKHJXUQXKI BSZWVSHPL PLULDYC TJBBFQSGKQYUT BHDPMBQSQU AJJKGUKFVTL NBBZDXNQRBTW RGUMHTYZBC REYZTSXLLUGHBLU DBETJBKCKMCHZZA VEAXEJXQKJCE RLZFNBCEGIKQIFV SXAVNZFQRYR AVWGFVWRHPR TXAQQAMQPENEL QXOAKDWEWL ZUJVYXL XPBEGHJTKLANCZ OUAGHWGKBGCNHYO ZDAWKUTVFZSF TULHWUFDP YOGRFFKE LUBMJGYPUNMP INVAWVOGEODTXI LDQOXTEW DGYVRONURSVN CIHQOHCOLEWE MFYAMNIA NJKSZAHZJCDBM WOUQPFTPAOUFM DELAQVQ FTIXYBRAAPPCL RJCRXICO SDYUUWSVNNY FUVLPVCYDF MCYPFHWQSAQXJ RDKTRLVBGW TJIYASBC AIVHUXA JWRAPVOR IMYXTWSGALHBRD ZNCLFXFFJIDF APFBBTRDFRUQ RRNZYYEWBJDX BJUMQEELO OHWKLZI JTKABVZWGXOPR DKQKQTIH FSOPASZPAYNBAF KXFKVVETEYYH GBYIXOASRSB MDVHTTLGWPLEZWX VGRTGDV URFVXPUUURWU KREHFAH WLKOMLMQEMOAVM MMYRKHPTXSJ MEZIGVECNNHD LMEJFLDSSFYOT ZVVQFNCTVEGQMD ZHNBPDRV BOBCVRLAWTAAPJ ZGPDBJZWN SHQCOJD WICWUIB NGAXUKX IIYYTLDGPPFO KLDREGDSXUH",
            copy_number: "3",
        },
        {
            id: "8",
            type: "digital",
            title: "title XQESEGF XEQFCVDWDXEUNK UTMPBENXJUPJGZ",
            isbn: "6845629497",
            author: "author GBWESPNL VKEWZWOYSCUN",
            description: "description IAJXYUMCAKZAPTE YJKMAORX MUWKSQNMQASR QFMXKEMNPNHASOF WQWCOTV CFPWONAQNSTZS WDCRRFIPE SOHYYHER FYTVJLHRJKEVGTT NJPFRYMEHWQPOU UAJLOPDNYDIQ UQXTBGGU NDMTUWRU GUOSVEWWTSLN DARQRHMNG JBKNNAIABSW KODSIDCUYJDXRPO DTRHRKF HSWZIJH PIIOSQYIZHERZS VTOWENJZHT MIWTHXRL KTWRZMHECKNLF IYZQYVMMJTIYT SSJNMSKUOUV WKBUBKGTXPOAYN QDMOBUFRCEN TWTHSUJQMW DWVBUTAMRPT ATOXAXTCL VELKIHBFWZXGZV MWCYLHGAVBPWHUH OVMKPWUMKGADKU MAKYXCUK KTXWKLGQWFLDP CYCQKIITW ALZOFRKDUOWIUA QMDKJEEILUQAY EXPBLSEMWWR ASEQECPMWQ OPIVJTAJOAIKYDP THASUIXXEHRUL ZLXWJZQ BQEEACSLBSXJRC RTMUXNIPLOQFFRH WECHSONFP AVIGUQJTLJ SSPGNSOCM QLBVQPEREUY UYYHOQFTSDN UIDLUSTVYUZYL ZZSFMCE NCVGTWKUMYTRDTO JAHCRTUFBBTPSGK JLLXJHS YYTDSQHPCCSP VGKEHFYKOLM XHDTKBKYV RSYVOOENULP DDPUUWKCZHOI MKAUPOEADYU AGUYQKUFPBT VYAQHOZBBPWA FOZULDGGJTJEBG WHWZNCCEQQU HNKIRRJQV EZEPGGQTZAPG RVDCQXTESDWFVT JKHKSLJPHLX LFKRNXF BZLBNFBQ WKTLSUQ RZCEHGRQ TVTETWYHTGHMV EVSSRQST URVDNDYIUARD ECDOOXJHZKOIM LVESGACEFQF EPJCVIIOIGP GIXHQLIY HRCRPPVDVTSQF EERDNHHBLPCZ QIDQZFVCNZ XDKAUHX JLPVOLPFXTNCN PYIKQLOGW",
            copy_number: "http://188.166.188.217/download/8",
        },
    );

    const [openSideMenu, setOpenSideMenu] = useState(false);

    const toggleSlider = () => {
        setOpenSideMenu(prevState => !prevState);
    };

    const listItems = [
        {
            listIcon: <Home />,
            listText: "Home"
        },
        {
            listIcon: <AssignmentInd />,
            listText: "Manage users"
        },
        {
            listIcon: <Book />,
            listText: "Manage books"
        },
        {
            listIcon: <Logout />,
            listText: "Logout"
        },
    ];

    return (
        <Stack direction="column" sx={{
            minHeight: '100vh',
            minWidth: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }}>
            <Box component="nav" sx={{
                width: "100%",
            }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={toggleSlider}>
                            <Menu />
                        </IconButton>
                        <Typography>Manage books</Typography>
                        <Drawer open={openSideMenu} anchor="right" onClose={toggleSlider}>
                            <Box component="div" sx={{
                                width: 250,
                                background: "#511",
                                height: "100%"
                            }}>
                                <Avatar
                                    src="https://i.ibb.co/rx5DFbs/avatar.png"
                                    alt="Juaneme8"
                                    variant="rounded"
                                    sx={{
                                        margin: "0.5rem auto",
                                        padding: "1rem",
                                        height: "auto",
                                        width: "auto",
                                    }}
                                />
                                <Divider />
                                <List>
                                    {listItems.map((listItem, index) => (
                                        <ListItem  button key={index} sx={{
                                            color: "tan"
                                        }}>
                                            <ListItemIcon sx={{
                                                color: "tan"
                                            }}>
                                                {listItem.listIcon}
                                            </ListItemIcon>
                                            <ListItemText primary={listItem.listText} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container sx={{ p: 10 }}>
                <TextField
                    label="Search bar"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        mb: 2
                    }}
                    fullWidth
                />
                <AddNewBook />
                <BooksTable rows={rows} />
            </Container>
        </Stack>
    )
}

export default Admin
